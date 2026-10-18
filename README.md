# 360.comix — website

One-page site for 360.comix: AI video, automation, systems and courses. Uzbek and Russian.

Live: https://ai-analitik.github.io/comix-site/

## Files
- `index.html`, `assets/` — the page (no build step, no libraries; fonts are self-hosted).
- `brand/` — logos, icons and video covers.
- `data/stats.json` — channel numbers that the page shows.
- `stats/fetch_stats.py` + `.github/workflows/stats.yml` — refresh `data/stats.json` every 6 hours.

## Live numbers
The workflow reads the Instagram API (Instagram Login) and the YouTube Data API and commits `data/stats.json`.
The page loads it from `raw.githubusercontent.com`, so new numbers appear without waiting for a Pages rebuild.
If a token is missing or expired, the old numbers stay.

Repository secrets (Settings → Secrets and variables → Actions):
`IG_TOKEN_MEDCOMIX`, `IG_TOKEN_TECHCOMIX`, `IG_TOKEN_360COMIX`, `YT_API_KEY`.

Instagram tokens need `instagram_business_basic` and `instagram_business_manage_insights`, and they last about 60 days.
