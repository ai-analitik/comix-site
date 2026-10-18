"""360.comix — fetch live stats for the website (run by GitHub Actions every 6 hours).

Reads tokens from env (GitHub secrets), writes data/stats.json that the site loads.

Safety rules (so the site never shows zeros or goes backwards):
  * If an account fails (missing/expired token, API error), its previous values are kept.
  * All-time totals (views, reach, likes, comments, shares, saves, watch_hours) never go
    down: if the API returns less than the saved value (missing insights permission,
    rate limit, partial failure), the saved value is kept and a note goes to "errors".
  * Video titles and local covers from the old file are carried over (matched by
    permalink, then by caption), because the API only knows captions.
  * Tokens are never written to the output, even inside error messages.

Env:
  IG_ACCOUNTS   comma list "key:ENV_NAME", default
                "medcomix:IG_TOKEN_MEDCOMIX,techcomix:IG_TOKEN_TECHCOMIX,c360:IG_TOKEN_360COMIX"
  IG_TOKEN_*    Instagram API (Instagram Login) long-lived user tokens
                permissions: instagram_business_basic + instagram_business_manage_insights
  YT_API_KEY    YouTube Data API v3 key (optional)
  YT_HANDLES    comma list of YouTube handles without @, default "MedComix"
  OUT           output path, default data/stats.json
"""
import json, os, sys, time, urllib.request, urllib.parse, urllib.error
from datetime import datetime, timezone

IG = 'https://graph.instagram.com/v25.0'
OUT = os.environ.get('OUT', 'data/stats.json')
METRICS = ['views', 'reach', 'likes', 'comments', 'shares', 'saves', 'watch_hours']
SECRETS = []  # filled in main(); scrubbed from every error text


def scrub(text):
    text = str(text)
    for s in SECRETS:
        if s:
            text = text.replace(s, '***')
    return text


def get(url, params=None):
    full = f'{url}?{urllib.parse.urlencode(params)}' if params else url
    with urllib.request.urlopen(full, timeout=30) as r:
        return json.loads(r.read())


def ig(path, token, **p):
    return get(f'{IG}/{path}', {**p, 'access_token': token})


def media_insights(mid, token, product):
    """views/reach/saved/shares (+ watch time for reels). Falls back to smaller metric sets."""
    sets = [['views', 'reach', 'saved', 'shares', 'ig_reels_video_view_total_time'],
            ['views', 'reach', 'saved', 'shares'], ['reach', 'saved'], ['reach']]
    if product != 'REELS':
        sets = sets[1:]
    for ms in sets:
        try:
            d = ig(f'{mid}/insights', token, metric=','.join(ms))
            out = {}
            for row in d.get('data', []):
                v = (row.get('values') or [{}])[0].get('value', (row.get('total_value') or {}).get('value', 0))
                out[row['name']] = v or 0
            return out
        except urllib.error.HTTPError:
            continue
    return {}


def instagram_account(token):
    me = ig('me', token, fields='user_id,username,name,followers_count,media_count,profile_picture_url')
    acc = {'username': me.get('username'), 'name': me.get('name'), 'followers': me.get('followers_count'),
           'posts': me.get('media_count', 0), 'avatar': me.get('profile_picture_url'),
           **{k: 0 for k in METRICS}, 'top': [], 'source': 'Instagram API'}
    url, params = f'{IG}/me/media', {'fields': 'id,caption,media_type,media_product_type,permalink,thumbnail_url,media_url,timestamp,like_count,comments_count',
                                     'limit': 50, 'access_token': token}
    items = []
    while url:
        d = get(url, params)
        items += d.get('data', [])
        url, params = (d.get('paging') or {}).get('next'), None
        if len(items) > 1000:
            break
    ins_ok = 0
    watch_ms = 0
    for m in items:
        ins = media_insights(m['id'], token, m.get('media_product_type'))
        if ins:
            ins_ok += 1
        v = int(ins.get('views', 0) or 0)
        acc['views'] += v
        acc['reach'] += int(ins.get('reach', 0) or 0)
        acc['shares'] += int(ins.get('shares', 0) or 0)
        acc['saves'] += int(ins.get('saved', 0) or 0)
        watch_ms += ins.get('ig_reels_video_view_total_time', 0) or 0  # milliseconds
        acc['likes'] += int(m.get('like_count', 0) or 0)
        acc['comments'] += int(m.get('comments_count', 0) or 0)
        acc['top'].append({'caption': (m.get('caption') or '')[:80], 'permalink': m.get('permalink'),
                           'thumb': m.get('thumbnail_url') or m.get('media_url'), 'views': v,
                           'likes': m.get('like_count', 0), 'comments': m.get('comments_count', 0),
                           'timestamp': m.get('timestamp')})
        time.sleep(0.15)
    acc['watch_hours'] = round(watch_ms / 3_600_000)
    acc['top'] = sorted(acc['top'], key=lambda x: -x['views'])[:6]
    acc['as_of'] = datetime.now(timezone.utc).isoformat(timespec='seconds')
    acc['_insights_ok'] = ins_ok
    acc['_media'] = len(items)
    return acc


def merge_with_old(key, new, old, errors):
    """Keep all-time totals from going down; carry over titles/covers; keep known followers."""
    ins_ok, media = new.pop('_insights_ok', 0), new.pop('_media', 0)
    if media and not ins_ok:
        errors.append(f'{key}: no media insights (check instagram_business_manage_insights permission)')
    if not old:
        return new
    kept = [k for k in METRICS if (old.get(k) or 0) > (new.get(k) or 0)]
    for k in kept:
        new[k] = old[k]
    if kept:
        errors.append(f'{key}: kept saved values for {", ".join(kept)} (API returned less)')
    if new.get('followers') is None and old.get('followers') is not None:
        new['followers'] = old['followers']
    by_link = {t.get('permalink'): t for t in old.get('top', []) if t.get('permalink')}
    by_cap = {(t.get('caption') or '').strip().lower(): t for t in old.get('top', []) if t.get('caption')}
    for t in new.get('top', []):
        o = by_link.get(t.get('permalink')) or by_cap.get((t.get('caption') or '').strip().lower())
        if o:
            for f in ('title', 'cover'):
                if o.get(f) and not t.get(f):
                    t[f] = o[f]
    if media and not ins_ok and old.get('top'):
        # no view counts at all, so the old top list is the better one
        new['top'] = old['top']
    return new


def youtube(key, handle):
    d = get('https://www.googleapis.com/youtube/v3/channels', {'part': 'statistics,snippet', 'forHandle': handle, 'key': key})
    items = d.get('items') or []
    if not items:
        raise RuntimeError(f'channel @{handle} not found')
    it = items[0]
    s = it.get('statistics', {})
    return {'handle': '@' + handle, 'title': it.get('snippet', {}).get('title'),
            'subscribers': int(s.get('subscriberCount', 0) or 0), 'views': int(s.get('viewCount', 0) or 0),
            'videos': int(s.get('videoCount', 0) or 0), 'source': 'YouTube Data API',
            'as_of': datetime.now(timezone.utc).isoformat(timespec='seconds')}


def main():
    try:
        old = json.load(open(OUT, encoding='utf-8'))
    except Exception:
        old = {}
    old_ig, old_yt = old.get('instagram') or {}, old.get('youtube') or {}
    new = {'updated_at': datetime.now(timezone.utc).isoformat(timespec='seconds'),
           'source_note': old.get('source_note', ''), 'instagram': {}, 'youtube': {}, 'errors': []}
    spec = os.environ.get('IG_ACCOUNTS', 'medcomix:IG_TOKEN_MEDCOMIX,techcomix:IG_TOKEN_TECHCOMIX,c360:IG_TOKEN_360COMIX')
    pairs = [p.split(':') for p in spec.split(',') if p.strip()]
    ytk = os.environ.get('YT_API_KEY', '').strip()
    handles = [x.strip() for x in os.environ.get('YT_HANDLES', 'MedComix').split(',') if x.strip()]
    SECRETS.extend([os.environ.get(env, '').strip() for _, env in pairs] + [ytk])
    api_ok = 0

    for key, env in pairs:
        tok = os.environ.get(env, '').strip()
        try:
            if not tok:
                raise RuntimeError(f'{env} not set')
            acc = instagram_account(tok)
            new['instagram'][key] = merge_with_old(key, acc, old_ig.get(key), new['errors'])
            api_ok += 1
            print('ok', key, {k: new['instagram'][key][k] for k in ('followers', 'views', 'likes')})
        except Exception as e:
            new['errors'].append(scrub(f'{key}: {e}'))
            if key in old_ig:
                new['instagram'][key] = old_ig[key]
            print('FAIL', key, scrub(e))

    for h in handles:
        try:
            if not ytk:
                raise RuntimeError('YT_API_KEY not set')
            new['youtube'][h] = youtube(ytk, h)
            api_ok += 1
        except Exception as e:
            new['errors'].append(scrub(f'youtube {h}: {e}'))
            if h in old_yt:
                new['youtube'][h] = old_yt[h]

    if not api_ok:
        new['updated_at'] = old.get('updated_at', new['updated_at'])  # nothing was refreshed

    ig_all, yt_all = list(new['instagram'].values()), list(new['youtube'].values())
    totals = {k: sum((a.get(k) or 0) for a in ig_all) for k in ('reach', 'likes', 'comments', 'shares', 'saves', 'watch_hours')}
    totals['views'] = sum((a.get('views') or 0) for a in ig_all) + sum((y.get('views') or 0) for y in yt_all)
    totals['posts'] = sum((a.get('posts') or 0) for a in ig_all) + sum((y.get('videos') or 0) for y in yt_all)
    totals['followers'] = sum((a.get('followers') or 0) for a in ig_all) + sum((y.get('subscribers') or 0) for y in yt_all)
    totals['followers_min'] = any(a.get('followers_min') or a.get('followers') is None for a in ig_all)
    totals['watch_hours'] = round(totals['watch_hours'])
    totals['channels'] = len(pairs) + len(handles)
    new['totals'] = totals

    os.makedirs(os.path.dirname(OUT) or '.', exist_ok=True)
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(new, f, ensure_ascii=False, indent=1)
    print('totals', totals)
    if new['errors']:
        print('errors:', *new['errors'], sep='\n  ')


if __name__ == '__main__':
    sys.exit(main())
