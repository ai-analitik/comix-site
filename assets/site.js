/* 360.comix — language, live stats, particle hero, 360° style carousel. No libraries. */
(function () {
  'use strict';

  var RAW = 'https://raw.githubusercontent.com/ai-analitik/comix-site/main/data/stats.json';
  var root = document.documentElement;

  /* ───────── texts ─────────
     Uzbek lives in the HTML (read once). Russian and the JS-drawn labels live here. */
  var RU = {
    'meta.title': '360.comix — ИИ-видео, автоматизация и системы',
    'meta.desc': 'ИИ-видео, автоматизация, Telegram-боты, сайты и курсы. Всё для вашего бизнеса в одном месте.',
    'skip': 'Перейти к результатам',
    'nav.label': 'Разделы', 'nav.styles': 'Стили', 'nav.services': 'Услуги', 'nav.results': 'Результаты', 'nav.courses': 'Курсы',
    'cta.write': 'Написать', 'cta.admin': 'Написать админу',
    'hero.title': 'ИИ-видео, автоматизация, системы.',
    'hero.sub': 'Всё для вашего бизнеса в одном месте.',
    'hero.styles': 'Смотреть стили',
    'hero.views': 'просмотров — в наших каналах',
    'hero.scroll': 'Листайте вниз',
    'm.views': 'просмотров', 'm.reach': 'охват', 'm.likes': 'лайков', 'm.comments': 'комментариев',
    'm.shares': 'репостов', 'm.saves': 'сохранений', 'm.watch': 'часов просмотра', 'm.followers': 'подписчиков', 'm.channels': 'канала',
    'styles.title': 'Стили видео', 'styles.sub': 'Одна идея — в любом стиле.', 'styles.cta': 'Заказать в этом стиле',
    'st.1.n': 'Комикс', 'st.1.d': 'Чёткий контур, яркий цвет. Наши каналы — в этом стиле.',
    'st.2.n': '3D', 'st.2.d': 'Объём, свет и тени. Товар со всех сторон.',
    'st.3.n': 'Аниме', 'st.3.d': 'В духе японской анимации: герои и небо.',
    'st.4.n': 'Кино', 'st.4.d': 'Широкий кадр и киношный цвет. Премиум-вид.',
    'st.5.n': 'Мультфильм', 'st.5.d': 'Яркие 2D-герои, весёлая анимация.',
    'st.6.n': '3D-мультфильм', 'st.6.d': 'Мягкий свет, добрые герои с большими глазами.',
    'st.7.n': 'Реализм', 'st.7.d': 'ИИ-видео, как настоящая съёмка.',
    'st.8.n': 'Инфографика', 'st.8.d': 'Цифры и графики в движении. Сложное — просто.',
    'svc.title': 'Услуги', 'svc.sub': 'Цену назовёт админ.', 'svc.order': 'Заказать',
    'svc.video.t': 'Видео с ИИ', 'svc.video.d': 'Reels, ИИ-голос, субтитры, монтаж.',
    'svc.insta.t': 'Ведение Instagram', 'svc.insta.d': 'План, видео, посты, статистика.',
    'svc.auto.t': 'Автоматизация', 'svc.auto.d': 'Автопостинг, ИИ-ответы, n8n.',
    'svc.systems.t': 'Системы', 'svc.systems.d': 'Видеосистема, CRM, дашборды.',
    'svc.bots.t': 'Telegram-боты', 'svc.bots.d': 'От идеи до запуска.',
    'svc.sites.t': 'Сайты', 'svc.sites.d': 'Быстрые и удобные на телефоне.',
    'svc.agents.t': 'ИИ-агенты', 'svc.agents.d': 'ИИ-помощники, которые работают за вас.',
    'svc.voice.t': 'ИИ-озвучка и дубляж', 'svc.voice.d': 'Живой узбекский голос, дубляж.',
    'svc.design.t': 'Дизайн', 'svc.design.d': 'Логотип, баннеры, фирменный стиль.',
    'svc.security.t': 'Безопасность', 'svc.security.d': 'Защита аккаунтов, сайтов и ботов.',
    'res.title': 'Результаты', 'res.auto': 'Обновляется автоматически', 'res.channels': 'Каналы', 'res.top': 'Топ видео',
    'proj.title': 'Проекты',
    'proj.case.l': 'просмотров — за первые 5 дней', 'proj.case.note': 'Buffer, 10 Reels',
    'proj.collab.d': 'Совместные видео.',
    'proj.bot.badge': 'В работе', 'proj.bot.t': 'Telegram-бот', 'proj.bot.d': 'Заказ клиента.',
    'proj.tg.t': 'Telegram-канал', 'proj.tg.d': 'Все каналы .comix в одном месте.', 'proj.tg.btn': 'Подписаться',
    'proj.sys.t': 'Наши системы',
    'sys.engine.t': 'ИИ-видеодвижок', 'sys.engine.d': 'От сценария до готового Reels.',
    'sys.post.t': 'Автопостинг', 'sys.post.d': 'Сам, в нужное время.',
    'sys.reply.t': 'ИИ-ответы на комментарии', 'sys.reply.d': 'В комментариях Instagram.',
    'sys.analytics.t': 'Аналитика', 'sys.analytics.d': 'Находит форматы, которые работают.',
    'sys.formats.t': 'Интерактивные форматы', 'sys.formats.d': 'Тесты, дилеммы, «найди».',
    'course.title': 'Курсы', 'course.sub': 'Видеоуроки.', 'course.sale': '−15% при записи сейчас',
    'course.open': 'Открыт', 'course.video.t': 'Видео с ИИ',
    'course.i1': 'Создание видео', 'course.i2': 'ИИ-озвучка', 'course.i3': 'Выбор ниши', 'course.i4': 'Видео для бизнеса', 'course.i5': 'Публикация в Instagram',
    'course.any': 'В любом стиле.', 'course.cta': 'Узнать цену и записаться',
    'course.full.d': 'Все направления, личная помощь и шанс попасть в команду.',
    'course.tariffs': 'Тарифы', 'tariff.start': 'Видеоуроки', 'tariff.pro': '+ ответы на вопросы', 'tariff.mentor': '+ личная помощь',
    'course.soon': 'Скоро',
    'soon.1': 'ИИ-агенты', 'soon.2': 'Telegram-боты', 'soon.3': 'Автоматизация (n8n)', 'soon.4': 'Сайты с ИИ',
    'soon.5': 'ИИ-озвучка и дубляж', 'soon.6': 'ИИ-дизайн и логотипы', 'soon.7': 'Instagram с ИИ',
    'final.t': 'Есть задача?', 'final.tg': 'Telegram-канал'
  };
  var DYN = {
    uz: { goto: "Kanalga o'tish", followers: 'obunachi', views: "ko'rish", likes: 'layk', comments: 'izoh', shares: 'ulashish', saves: 'saqlash', subscribers: 'obunachi', videos: 'video', mln: 'mln', k: 'ming' },
    ru: { goto: 'Открыть канал', followers: 'подписчики', views: 'просмотры', likes: 'лайки', comments: 'комментарии', shares: 'репосты', saves: 'сохранения', subscribers: 'подписчики', videos: 'видео', mln: 'млн', k: 'тыс.' }
  };
  var UZ = {};
  var i18nEls = [].slice.call(document.querySelectorAll('[data-i18n]'));
  var ariaEls = [].slice.call(document.querySelectorAll('[data-i18n-aria]'));
  i18nEls.forEach(function (el) { var k = el.getAttribute('data-i18n'); if (!(k in UZ)) UZ[k] = el.textContent; });
  ariaEls.forEach(function (el) { UZ[el.getAttribute('data-i18n-aria')] = el.getAttribute('aria-label'); });
  UZ['meta.title'] = document.title;
  UZ['meta.desc'] = document.querySelector('meta[name="description"]').content;

  var lang = 'uz';
  try { var saved = localStorage.getItem('comix-lang'); if (saved === 'ru' || saved === 'uz') lang = saved; } catch (e) {}
  function t(key) { var d = lang === 'ru' ? RU : UZ; return key in d ? d[key] : UZ[key]; }
  function ruPlural(n, one, few, many) { var a = n % 10, b = n % 100; if (a === 1 && b !== 11) return one; if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return few; return many; }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem('comix-lang', l); } catch (e) {}
    root.lang = l;
    i18nEls.forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    ariaEls.forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    document.title = t('meta.title');
    document.querySelector('meta[name="description"]').content = t('meta.desc');
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === l)); });
    render();
    showStyle(frontStyle, true);
    fitScenes();
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); }); });

  /* ───────── numbers ───────── */
  function dec1(x) { var r = Math.round(x * 10) / 10; return (r % 1 === 0 ? String(r) : r.toFixed(1)).replace('.', ','); }
  function short(n) {
    if (n == null || isNaN(n)) return '—';
    var d = DYN[lang];
    if (n >= 1e6) return dec1(n / 1e6) + ' ' + d.mln;
    if (n >= 1e4) return Math.round(n / 1e3) + ' ' + d.k;
    if (n >= 1e3) return dec1(n / 1e3) + ' ' + d.k;
    return String(Math.round(n));
  }
  function when(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return '';
    try {
      var g = {};
      new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Tashkent', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
        .formatToParts(d).forEach(function (p) { g[p.type] = p.value; });
      return g.day + '.' + g.month + '.' + g.year + ', ' + g.hour + ':' + g.minute;
    } catch (e) { return d.toISOString().slice(0, 16).replace('T', ' '); }
  }

  /* ───────── data ───────── */
  var CH = {
    medcomix: { name: 'med.comix', url: 'https://instagram.com/med.comix', c: '#E8262B', logo: 'brand/medcomix_logo_burst.svg' },
    techcomix: { name: 'tech.comix', url: 'https://instagram.com/tech.comix', c: '#1F6BFF', logo: 'brand/techcomix_burst.svg' },
    c360: { name: '360.comix', url: 'https://instagram.com/360.comix', c: '#7A3CFF', logo: 'brand/360comix_burst_256.webp' }
  };
  var YT = { MedComix: { name: 'Med Comix', url: 'https://youtube.com/@MedComix', c: '#E8262B', logo: 'brand/medcomix_logo_burst.svg' } };
  var DATA = {};
  try { DATA = JSON.parse(document.getElementById('snap').textContent); } catch (e) { DATA = { instagram: {}, youtube: {} }; }

  function hasData(a) { return a && ((a.views || 0) > 0 || (a.followers || 0) > 0 || (a.subscribers || 0) > 0); }
  function totals(d) {
    if (d.totals) return d.totals;
    var ig = Object.keys(d.instagram || {}).map(function (k) { return d.instagram[k]; });
    var yt = Object.keys(d.youtube || {}).map(function (k) { return d.youtube[k]; });
    var s = function (arr, f) { return arr.reduce(function (a, x) { return a + (x[f] || 0); }, 0); };
    return {
      views: s(ig, 'views') + s(yt, 'views'), reach: s(ig, 'reach'), likes: s(ig, 'likes'), comments: s(ig, 'comments'),
      shares: s(ig, 'shares'), saves: s(ig, 'saves'), watch_hours: s(ig, 'watch_hours'),
      followers: s(ig, 'followers') + s(yt, 'subscribers'),
      followers_min: ig.some(function (a) { return a.followers_min || a.followers == null; }),
      channels: Object.keys(CH).length + Object.keys(YT).length
    };
  }
  function fmtMetric(key, v, tt) { var s = short(v); if (key === 'followers' && tt && tt.followers_min) s += '+'; return s; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function safeUrl(u) { return /^https:\/\//.test(u || '') ? u : null; }

  var counted = false, countReady = false;
  function render() {
    var tt = totals(DATA);
    document.querySelectorAll('[data-stat]').forEach(function (el) { var k = el.getAttribute('data-stat'); el.textContent = fmtMetric(k, tt[k], tt); });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var k = el.getAttribute('data-count'); el.dataset.v = tt[k] || 0;
      if (counted || !countReady) el.textContent = fmtMetric(k, tt[k], tt);
    });
    var chLabel = document.querySelector('[data-count="channels"] + .tot-l');
    if (chLabel) chLabel.textContent = lang === 'ru' ? ruPlural(tt.channels || 0, 'канал', 'канала', 'каналов') : UZ['m.channels'];
    var up = document.getElementById('updated');
    if (up && DATA.updated_at) { up.textContent = when(DATA.updated_at); up.setAttribute('datetime', DATA.updated_at); }
    renderLineup();
    renderTop();
  }

  function row(label, value) { return '<div><dt>' + label + '</dt><dd>' + value + '</dd></div>'; }
  function chanCard(m, kind, stats, k) {
    return '<article class="chan spot" style="--c:' + m.c + ';--k:' + k + '"><div class="chan-top"><img src="' + m.logo + '" alt="" width="44" height="44"><div><p class="chan-name">' + m.name + '</p><p class="chan-kind">' + kind + '</p></div></div>' +
      '<dl class="chan-stats">' + stats + '</dl><a class="chan-link" href="' + m.url + '" target="_blank" rel="noopener">' + DYN[lang].goto + '</a></article>';
  }
  function renderLineup() {
    var box = document.getElementById('lineup');
    if (!box) return;
    var d = DYN[lang], html = '', k = 0;
    Object.keys(CH).forEach(function (key) {
      var a = (DATA.instagram || {})[key];
      if (!hasData(a)) return;
      var fol = a.followers == null ? '' : row(d.followers, short(a.followers) + (a.followers_min ? '+' : ''));
      html += chanCard(CH[key], 'Instagram', fol + row(d.views, short(a.views)) + row(d.likes, short(a.likes)) + row(d.comments, short(a.comments)) + row(d.shares, short(a.shares)) + row(d.saves, short(a.saves)), k++);
    });
    Object.keys(YT).forEach(function (key) {
      var y = (DATA.youtube || {})[key];
      if (!hasData(y)) return;
      html += chanCard(YT[key], 'YouTube', row(d.subscribers, short(y.subscribers)) + row(d.views, short(y.views)) + row(d.videos, short(y.videos)), k++);
    });
    box.innerHTML = html;
    bindSpots(box);
  }

  var topKey = null;
  function topKeys() { return Object.keys(CH).filter(function (k) { var a = (DATA.instagram || {})[k]; return a && a.top && a.top.length; }); }
  function renderTop() {
    var tabs = document.getElementById('top-tabs'), grid = document.getElementById('top-grid');
    if (!tabs || !grid) return;
    var keys = topKeys();
    if (!keys.length) { tabs.innerHTML = ''; grid.innerHTML = ''; return; }
    if (keys.indexOf(topKey) < 0) topKey = keys[0];
    tabs.innerHTML = keys.map(function (k) {
      return '<button type="button" class="tab" role="tab" id="tab-' + k + '" aria-controls="top-grid" aria-selected="' + (k === topKey) + '" tabindex="' + (k === topKey ? 0 : -1) + '" data-k="' + k + '">' + CH[k].name + '</button>';
    }).join('');
    grid.setAttribute('aria-labelledby', 'tab-' + topKey);
    var m = CH[topKey], a = DATA.instagram[topKey], d = DYN[lang];
    grid.innerHTML = a.top.slice(0, 6).map(function (v, i) {
      var href = safeUrl(v.permalink) || m.url, title = v.title || v.caption || '', img = v.cover || safeUrl(v.thumb);
      var media = img
        ? '<img src="' + esc(img) + '" alt="" loading="lazy" decoding="async" onerror="this.remove()">'
        : '<span class="vid-ph"><img src="' + m.logo + '" alt=""><span class="vid-ph-t">' + esc(title) + '</span></span>';
      return '<a class="vid" style="--c:' + m.c + '" href="' + esc(href) + '" target="_blank" rel="noopener" aria-label="' + esc(title) + ' — ' + short(v.views) + ' ' + d.views + '">' + media +
        '<span class="vid-rank">' + (i + 1) + '</span><span class="vid-meta">' + (img ? '<span class="vid-t">' + esc(title) + '</span>' : '') +
        '<span class="vid-v"><svg class="ico-s" aria-hidden="true"><use href="#i-eye"/></svg>' + short(v.views) + '</span></span></a>';
    }).join('');
    fitTitles();
  }
  function fitTitles() {
    document.querySelectorAll('.vid-ph-t').forEach(function (el) {
      el.style.fontSize = ''; el.style.overflowWrap = '';
      var size = parseFloat(getComputedStyle(el).fontSize), guard = 0;
      while (el.scrollWidth > el.clientWidth + 1 && size > 10 && guard++ < 40) { size -= 0.5; el.style.fontSize = size + 'px'; }
      if (el.scrollWidth > el.clientWidth + 1) el.style.overflowWrap = 'anywhere';
    });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.tab');
    if (b) { topKey = b.getAttribute('data-k'); renderTop(); var nb = document.getElementById('tab-' + topKey); if (nb) nb.focus(); }
  });
  document.addEventListener('keydown', function (e) {
    var b = e.target.closest && e.target.closest('.tab');
    if (!b || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
    var keys = topKeys(), i = keys.indexOf(b.getAttribute('data-k'));
    topKey = keys[(i + (e.key === 'ArrowRight' ? 1 : keys.length - 1)) % keys.length];
    renderTop(); document.getElementById('tab-' + topKey).focus(); e.preventDefault();
  });

  function countUp() {
    if (counted) return;
    counted = true;
    var els = [].slice.call(document.querySelectorAll('[data-count]')), tt = totals(DATA), t0 = performance.now(), dur = 1600;
    (function step(now) {
      var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      els.forEach(function (el) { var k = el.getAttribute('data-count'), v = +el.dataset.v || 0; el.textContent = fmtMetric(k, p < 1 ? v * e : v, tt); });
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  function load() {
    var urls = [RAW + '?t=' + Date.now(), 'data/stats.json?t=' + Date.now()];
    (function next(i) {
      if (i >= urls.length || !window.fetch) return;
      fetch(urls[i], { cache: 'no-store' }).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) {
        if (!d || !d.instagram) throw 0;
        if (!DATA.updated_at || !d.updated_at || d.updated_at >= DATA.updated_at) { DATA = d; render(); }
      }).catch(function () { next(i + 1); });
    })(0);
  }

  /* ───────── small effects ───────── */
  var top = document.querySelector('.top');
  function bindSpots(scope) {
    (scope || document).querySelectorAll('.spot').forEach(function (el) {
      if (el._spot) return; el._spot = 1;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }
  bindSpots();

  /* ───────── scenes ───────── */
  var rmq = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  function applyRM() { root.classList.toggle('rm', !!rmq.matches); }
  applyRM();

  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
  function smooth(x) { return x * x * (3 - 2 * x); }
  function active(s) { return s && !root.classList.contains('rm') && !s.classList.contains('static'); }
  function progress(s) { var r = s.getBoundingClientRect(), total = s.offsetHeight - window.innerHeight; return total > 0 ? clamp(-r.top / total, 0, 1) : 0; }

  var hero = document.querySelector('[data-scene="hero"]');
  var styles = document.querySelector('[data-scene="styles"]');
  var panels = hero ? [].slice.call(hero.querySelectorAll('.panel')) : [];
  var deg = hero && hero.querySelector('.deg');
  var hint = hero && hero.querySelector('.hint');

  /* particles: a sphere that becomes "360", then a ring */
  var P = (function () {
    var cvs = hero && hero.querySelector('.particles');
    if (!cvs || !cvs.getContext) return null;
    var ctx = cvs.getContext('2d');
    var W = 0, H = 0, DPR = 1, N = 0, cx = 0, cy = 0, S = 1;
    var sph = [], txt = [], ring = [], ph = [], grp = [[], [], []];
    var COLORS = ['#EEE9FF', '#A98BFF', '#7C93FF'];
    var p = 0, run = false, visible = true, t0 = performance.now(), mx = -1e5, my = -1e5;

    function fib(n) { var o = [], g = Math.PI * (3 - Math.sqrt(5)); for (var i = 0; i < n; i++) { var y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), th = g * i; o.push([Math.cos(th) * r, y, Math.sin(th) * r]); } return o; }
    function textPts(n) {
      var c = document.createElement('canvas'), w = 640, h = 280; c.width = w; c.height = h;
      var x = c.getContext('2d'); x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.font = '400 220px Unbounded, "Arial Black", Arial, sans-serif'; x.fillText('360', w / 2, h / 2 + 6);
      var d = x.getImageData(0, 0, w, h).data, cand = [];
      for (var yy = 0; yy < h; yy += 2) for (var xx = 0; xx < w; xx += 2) if (d[(yy * w + xx) * 4 + 3] > 150) cand.push([(xx - w / 2) / (w / 2) * 1.3, (yy - h / 2) / (w / 2) * 1.3]);
      for (var i = cand.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), tmp = cand[i]; cand[i] = cand[j]; cand[j] = tmp; }
      var o = []; for (var k = 0; k < n; k++) { var q = cand[k % cand.length] || [0, 0]; o.push([q[0] + (Math.random() - .5) * .01, q[1] + (Math.random() - .5) * .01, (Math.random() - .5) * .08]); }
      return o;
    }
    function ringPts(n) { var o = []; for (var i = 0; i < n; i++) { var th = i / n * Math.PI * 2 + Math.random() * .02, r = 1.45 + (Math.random() + Math.random() + Math.random() - 1.5) * .07; o.push([Math.cos(th) * r, (Math.random() - .5) * .05, Math.sin(th) * r]); } return o; }
    function build() {
      N = W < 700 ? 1100 : 2000;
      sph = fib(N); txt = textPts(N); ring = ringPts(N); ph = []; grp = [[], [], []];
      for (var i = 0; i < N; i++) { ph.push(Math.random() * 6.283); var r = Math.random(); grp[r < .62 ? 0 : r < .9 ? 1 : 2].push(i); }
    }
    function size() {
      var r = cvs.getBoundingClientRect();
      DPR = Math.min(2, window.devicePixelRatio || 1);
      var nw = Math.round(r.width), nh = Math.round(r.height), first = !N || (nw < 700) !== (W < 700);
      W = nw; H = nh; cvs.width = W * DPR; cvs.height = H * DPR;
      if (W >= 900) { cx = W * .7; cy = H * .5; S = Math.min(W * .16, H * .26); }
      else { cx = W * .5; cy = H * .3; S = Math.min(W * .34, H * .17); }
      if (first) build();
    }
    function draw(now) {
      var tt = (now - t0) / 1000;
      var a = smooth(clamp((p - .05) / .3, 0, 1)), b = smooth(clamp((p - .64) / .3, 0, 1));
      var rs = tt * .3 + p * 6.283, cs = Math.cos(rs), sn = Math.sin(rs), ct = Math.cos(.35), st = Math.sin(.35);
      var rr = tt * .22, cr = Math.cos(rr), sr = Math.sin(rr), cx2 = Math.cos(1.18), sx2 = Math.sin(1.18);
      var F = 3.4 * S * DPR, sc = S * DPR, X0 = cx * DPR, Y0 = cy * DPR, R = 90 * DPR, R2 = R * R, MX = mx * DPR, MY = my * DPR;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cvs.width, cvs.height);
      ctx.globalCompositeOperation = 'lighter';
      for (var g = 0; g < 3; g++) {
        ctx.fillStyle = COLORS[g];
        var idx = grp[g];
        for (var n = 0; n < idx.length; n++) {
          var i = idx[n], s = sph[i], q = txt[i], o = ring[i];
          var x1 = s[0] * cs + s[2] * sn, z1 = -s[0] * sn + s[2] * cs, y1 = s[1] * ct - z1 * st; z1 = s[1] * st + z1 * ct;
          var x3 = o[0] * cr + o[2] * sr, z3 = -o[0] * sr + o[2] * cr, y3 = o[1] * cx2 - z3 * sx2; z3 = o[1] * sx2 + z3 * cx2;
          var w = Math.sin(tt * 1.3 + ph[i]) * .012;
          var x = (x1 + (q[0] - x1) * a) * (1 - b) + x3 * b + w;
          var y = (y1 + (q[1] - y1) * a) * (1 - b) + y3 * b + w * .6;
          var z = (z1 + (q[2] - z1) * a) * (1 - b) + z3 * b;
          var k = F / (F - z * sc), X = X0 + x * sc * k, Y = Y0 + y * sc * k;
          var dx = X - MX, dy = Y - MY, d2 = dx * dx + dy * dy;
          if (d2 < R2) { var dd = Math.sqrt(d2) || 1, f = (1 - dd / R) * 22 * DPR; X += dx / dd * f; Y += dy / dd * f; }
          var depth = clamp((z + 1.5) / 3, 0, 1);
          ctx.globalAlpha = .22 + depth * .78;
          var sz = (.9 + depth * 1.3) * DPR;
          ctx.fillRect(X, Y, sz, sz);
        }
      }
      ctx.globalAlpha = 1;
    }
    function loop(now) { if (!run) return; draw(now); requestAnimationFrame(loop); }
    function start() { if (run || !visible || root.classList.contains('rm')) return; run = true; requestAnimationFrame(loop); }
    function stop() { run = false; }
    size();
    if (document.fonts && document.fonts.load) document.fonts.load('400 220px Unbounded').then(function () { txt = textPts(N); if (!run) draw(performance.now()); }).catch(function () {});
    window.addEventListener('resize', function () { size(); if (!run) draw(performance.now()); });
    hero.addEventListener('pointermove', function (e) { var r = cvs.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
    hero.addEventListener('pointerleave', function () { mx = my = -1e5; });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); else stop(); }).observe(hero);
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
    return {
      set: function (v) { p = v; },
      still: function (v) { stop(); p = v; draw(t0 + 4000); },
      start: start
    };
  })();

  /* 360° style carousel */
  var cyl = styles && styles.querySelector('.cyl');
  var faces = styles ? [].slice.call(styles.querySelectorAll('.face')) : [];
  var stNow = styles && styles.querySelector('.st-now');
  var frontStyle = 0;
  function showStyle(i, force) {
    if (!stNow || !faces[i] || (i === frontStyle && !force)) return;
    frontStyle = i;
    stNow.querySelector('.st-i').textContent = String(i + 1).padStart(2, '0');
    stNow.querySelector('.st-name').textContent = faces[i].querySelector('.f-name').textContent;
    stNow.querySelector('.st-desc').textContent = faces[i].querySelector('.f-desc').textContent;
    if (!force) { stNow.classList.remove('swap'); void stNow.offsetWidth; stNow.classList.add('swap'); }
  }

  function fitScenes() {
    [hero, styles].forEach(function (s) {
      if (!s) return;
      s.classList.remove('static');
      if (root.classList.contains('rm')) return;
      var st = s.querySelector('.stage'), pad = parseFloat(getComputedStyle(st).paddingBottom) || 0, need = 0;
      s.querySelectorAll('[data-fit]').forEach(function (el) { var r = el.getBoundingClientRect(), sr = st.getBoundingClientRect(); need = Math.max(need, r.bottom - sr.top); });
      if (need + pad > st.clientHeight + 4) s.classList.add('static');
    });
    tick();
  }

  var lastStep = -1;
  function tick() {
    ticking = false;
    if (top) top.classList.toggle('scrolled', window.scrollY > 40);
    if (hero) {
      if (active(hero)) {
        var p = progress(hero);
        if (P) { P.set(p); P.start(); }
        if (deg) deg.textContent = Math.round(p * 360) + '°';
        var s = p < .26 ? 0 : p < .62 ? 1 : 2;
        if (s !== lastStep) { panels.forEach(function (pn, i) { pn.classList.toggle('is-on', i === s); pn.setAttribute('aria-hidden', String(i !== s)); }); lastStep = s; }
        if (hint) hint.classList.toggle('gone', p > .03);
      } else {
        panels.forEach(function (pn) { pn.classList.add('is-on'); pn.removeAttribute('aria-hidden'); });
        lastStep = -1;
        if (P) { if (root.classList.contains('rm')) P.still(.45); else { P.set(.45); P.start(); } }
      }
    }
    if (styles && cyl) {
      if (active(styles)) {
        var q = progress(styles), n = faces.length, tq = q * n, k = Math.floor(tq), f = tq - k;
        var e = Math.min(n, k + smooth(clamp((f - .3) / .4, 0, 1)));
        var ang = -e * (360 / n);
        cyl.style.setProperty('--a', ang.toFixed(2));
        faces.forEach(function (fc, i) {
          var dlt = Math.abs(((i * 360 / n + ang) % 360 + 540) % 360 - 180);
          fc.style.setProperty('--dim', (Math.min(1, dlt / 110) * .8).toFixed(3));
        });
        showStyle(Math.round(e) % n);
      } else {
        cyl.style.removeProperty('--a');
        faces.forEach(function (fc) { fc.style.removeProperty('--dim'); });
      }
    }
  }
  var ticking = false;
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }, { passive: true });
  var rz;
  window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { fitScenes(); fitTitles(); }, 150); });
  if (rmq.addEventListener) rmq.addEventListener('change', function () { applyRM(); fitScenes(); });

  /* reveal-once + live toggles */
  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add('in');
        if (el.id === 'totals' && !root.classList.contains('rm')) countUp();
        revealIO.unobserve(el);
      });
    }, { threshold: .18, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('[data-reveal], #lineup').forEach(function (el) {
      var sib = el.parentElement ? [].slice.call(el.parentElement.querySelectorAll(':scope > [data-reveal]')) : [];
      var i = sib.indexOf(el); if (i > 0) el.style.setProperty('--d', Math.min(i, 8));
      revealIO.observe(el);
    });
    if (!root.classList.contains('rm')) countReady = true;
    if (styles) new IntersectionObserver(function (en) { styles.classList.toggle('playing', en[0].isIntersecting); }).observe(styles);
  } else {
    document.querySelectorAll('[data-reveal], #lineup').forEach(function (el) { el.classList.add('in'); });
    if (styles) styles.classList.add('playing');
  }

  /* start */
  if (lang !== 'uz') setLang(lang); else { render(); showStyle(0, true); }
  if (countReady) document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = '0'; });
  fitScenes();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fitScenes(); fitTitles(); });
  window.addEventListener('load', fitScenes);
  load();
})();
