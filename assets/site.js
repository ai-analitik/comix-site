/* 360.comix — language switch, live stats, scroll scenes. No libraries. */
(function () {
  'use strict';

  var ADMIN = 'https://t.me/comix_admin';
  var RAW = 'https://raw.githubusercontent.com/ai-analitik/comix-site/main/data/stats.json';
  var root = document.documentElement;

  /* ───────── texts ─────────
     Uzbek copy lives in the HTML (read once from the page).
     Russian copy and the labels that JS draws live here. */
  var RU = {
    'meta.title': '360.comix — ИИ-видео, автоматизация и системы',
    'meta.desc': 'ИИ-видео, Instagram, Telegram-боты, сайты и автоматизация для бизнеса и блогеров. Есть курсы.',
    'skip': 'Перейти к результатам',
    'nav.label': 'Разделы',
    'nav.services': 'Услуги', 'nav.results': 'Результаты', 'nav.projects': 'Проекты', 'nav.courses': 'Курсы',
    'cta.admin': 'Написать админу',
    'hero.title': 'Видео, автоматизация и системы на ИИ — для вашего бизнеса на все 360°',
    'hero.sub': 'От комикс-Reels до Telegram-ботов — всё в одном месте.',
    'hero.views': 'просмотров в каналах med.comix и tech.comix',
    'hero.own': 'Это цифры наших собственных каналов. Они обновляются автоматически.',
    'hero.scroll': 'Листайте вниз',
    'm.views': 'просмотров', 'm.reach': 'охват', 'm.likes': 'лайков', 'm.comments': 'комментариев',
    'm.shares': 'репостов', 'm.saves': 'сохранений', 'm.watch': 'часов просмотра', 'm.followers': 'подписчиков',
    'm.channels': 'канала',
    'svc.title': 'Всё, что можно сделать с ИИ',
    'svc.sub': 'Нажмите на услугу — откроются детали. Цену назовёт админ.',
    'svc.pow': 'БАМ!', 'svc.order': 'Заказать', 'svc.price': 'Узнать цену', 'svc.close': 'Закрыть',
    'svc.video.t': 'Видео с ИИ', 'svc.video.d': 'Reels в стиле комикса, ИИ-озвучка, субтитры и монтаж.',
    'svc.insta.t': 'Ведение Instagram', 'svc.insta.d': 'Контент-план, видео, публикации и статистика.',
    'svc.auto.t': 'Автоматизация', 'svc.auto.d': 'Автопостинг, ИИ-ответы на комментарии, сценарии в n8n.',
    'svc.systems.t': 'Системы', 'svc.systems.d': 'Система автоматического производства видео, CRM, дашборды.',
    'svc.bots.t': 'Telegram-боты', 'svc.bots.d': 'Telegram-бот для вашего бизнеса — от идеи до запуска.',
    'svc.sites.t': 'Сайты', 'svc.sites.d': 'Современный сайт, который быстро открывается на телефоне.',
    'svc.agents.t': 'ИИ-агенты', 'svc.agents.d': 'ИИ-помощники, которые отвечают на вопросы и выполняют задачи.',
    'svc.voice.t': 'ИИ-озвучка и дубляж', 'svc.voice.d': 'Естественный ИИ-голос на узбекском и дубляж на другие языки.',
    'svc.design.t': 'Дизайн', 'svc.design.d': 'Логотип, баннеры и фирменный стиль.',
    'svc.security.t': 'Безопасность', 'svc.security.d': 'Защита аккаунтов, безопасность сайтов и ботов.',
    'res.title': 'Результаты',
    'res.sub': 'Все цифры — из наших собственных каналов, за всё время.',
    'res.auto': 'Обновляется автоматически', 'res.updated': 'Последнее обновление:',
    'res.channels': 'Каналы', 'res.top': 'Самые просматриваемые видео',
    'proj.title': 'Проекты',
    'proj.sub': 'Наши каналы и системы, которые мы построили для себя.',
    'proj.case.tag': 'С нуля',
    'proj.case.t': 'tech.comix — запустили с нуля',
    'proj.case.l': 'просмотров за первые 5 дней',
    'proj.case.d': 'Канал запустили 14 октября 2026 года. Логотип, стиль, формат и контент-план — наша работа. За первые 5 дней вышло 14 Reels.',
    'proj.case.note': 'По 10 Reels, у которых уже есть статистика (данные Buffer).',
    'proj.collab.d': 'Два канала выпустили совместные видео: «Telefon testi» и «Miyadagi chip». Цель — рост аудитории обоих каналов.',
    'proj.bot.badge': 'В работе', 'proj.bot.t': 'Telegram-бот для клиента', 'proj.bot.d': 'Работаем над первым заказом.',
    'proj.tg.t': 'Все каналы .comix — в одном Telegram-канале', 'proj.tg.d': 'Новости всех наших каналов в одном месте.', 'proj.tg.btn': 'Подписаться на канал',
    'proj.links.t': 'Наши каналы',
    'proj.sys.t': 'Системы, которые мы построили и используем сами',
    'sys.engine.t': 'ИИ-видеодвижок', 'sys.engine.d': 'От сценария до готового Reels: комикс-сцены, анимация, живой ИИ-голос на узбекском, синхронизация по словам, караоке-субтитры, звуки и музыка. Файл до 30 МБ для Instagram.',
    'sys.post.t': 'Автопостинг', 'sys.post.d': 'Видео выходит в Instagram в заданное время — с обложкой и подписью-вопросом.',
    'sys.reply.t': 'ИИ-ответы на комментарии', 'sys.reply.d': 'ИИ сам отвечает на комментарии в Instagram.',
    'sys.analytics.t': 'Аналитика и контент-стратегия', 'sys.analytics.d': 'Показывает, какие форматы собирают больше просмотров, комментариев и репостов. По этим данным планируем следующие видео.',
    'sys.formats.t': 'Интерактивные форматы', 'sys.formats.d': 'Дилемма «A или B», тесты, «найди» и «найди отличия» — шаблоны, которые повышают комментарии и репосты.',
    'course.title': 'Курсы',
    'course.sub': 'Все уроки — видеоуроки. Курс по ИИ-видео уже открыт, остальные направления скоро.',
    'course.sale': 'Скидка 15% при записи сейчас',
    'course.open': 'Открыт',
    'course.video.t': 'Создание видео с ИИ',
    'course.video.i1': 'Создание видео', 'course.video.i2': 'ИИ-озвучка', 'course.video.i3': 'Выбор направления (ниши)',
    'course.video.i4': 'Видео для своего бизнеса', 'course.video.i5': 'Правильная публикация в Instagram',
    'course.video.note': 'Не только комиксы — ИИ-видео в любом стиле.',
    'course.video.proof': 'Этим методом tech.comix набрал 693 716 просмотров за первые 5 дней.',
    'course.cta': 'Узнать цену / записаться — напишите админу',
    'course.full.t': 'FULL-курс',
    'course.full.d': 'Все направления в одном курсе, индивидуальная помощь и возможность попасть в нашу команду.',
    'course.tariffs.t': 'В каждом направлении 3 тарифа',
    'tariff.start': 'Только видеоуроки.', 'tariff.pro': 'Видеоуроки и ответы на ваши вопросы.',
    'tariff.mentor': 'Всё из Pro и личная помощь — вплоть до выбора вашего направления.',
    'course.soon': 'Скоро', 'course.soon.d': 'Видеоуроки готовятся.',
    'soon.1': 'ИИ-агенты', 'soon.2': 'Создание Telegram-ботов', 'soon.3': 'Автоматизация (n8n)', 'soon.4': 'Сайты с помощью ИИ',
    'soon.5': 'ИИ-озвучка и дубляж', 'soon.6': 'ИИ-дизайн и логотипы', 'soon.7': 'Ведение Instagram с ИИ',
    'final.t': 'Есть задача?',
    'final.d': 'Напишите админу — вместе разберёмся, что нужно, и назовём цену.',
    'final.tg': 'Подписаться на Telegram-канал',
    'foot.admin': 'Заказы и вопросы', 'foot.tg': 'Telegram-канал'
  };
  var DYN = {
    uz: { instagram: 'Instagram', youtube: 'YouTube', goto: "Kanalga o'tish", followers: 'obunachi', views: "ko'rish", likes: 'layk',
          comments: 'izoh', shares: 'ulashish', saves: 'saqlash', subscribers: 'obunachi', videos: 'video', mln: 'mln', k: 'ming',
          soon: 'tez orada' },
    ru: { instagram: 'Instagram', youtube: 'YouTube', goto: 'Открыть канал', followers: 'подписчики', views: 'просмотры', likes: 'лайки',
          comments: 'комментарии', shares: 'репосты', saves: 'сохранения', subscribers: 'подписчики', videos: 'видео', mln: 'млн', k: 'тыс.',
          soon: 'скоро' }
  };
  var UZ = {};
  var i18nEls = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  var ariaEls = Array.prototype.slice.call(document.querySelectorAll('[data-i18n-aria]'));
  i18nEls.forEach(function (el) { var k = el.getAttribute('data-i18n'); if (!(k in UZ)) UZ[k] = el.textContent; });
  ariaEls.forEach(function (el) { UZ[el.getAttribute('data-i18n-aria')] = el.getAttribute('aria-label'); });
  UZ['meta.title'] = document.title;
  UZ['meta.desc'] = document.querySelector('meta[name="description"]').content;

  var lang = 'uz';
  try { var saved = localStorage.getItem('comix-lang'); if (saved === 'ru' || saved === 'uz') lang = saved; } catch (e) {}

  function t(key) { var d = lang === 'ru' ? RU : UZ; return key in d ? d[key] : UZ[key]; }

  function ruPlural(n, one, few, many) {
    var a = n % 10, b = n % 100;
    if (a === 1 && b !== 11) return one;
    if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return few;
    return many;
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem('comix-lang', l); } catch (e) {}
    root.lang = l;
    i18nEls.forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    ariaEls.forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    document.title = t('meta.title');
    document.querySelector('meta[name="description"]').content = t('meta.desc');
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === l)); });
    render(false);
    fitScenes();
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

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
  function exact(n) { return n == null ? '—' : Math.round(n).toLocaleString('ru-RU').replace(/\s/g, ' '); }
  function when(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return '';
    try {
      var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Tashkent', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(d);
      var g = {}; parts.forEach(function (p) { g[p.type] = p.value; });
      return g.day + '.' + g.month + '.' + g.year + ', ' + g.hour + ':' + g.minute;
    } catch (e) { return d.toISOString().slice(0, 16).replace('T', ' '); }
  }

  /* ───────── data ───────── */
  var CH = {
    medcomix: { name: 'med.comix', url: 'https://instagram.com/med.comix', c: 'var(--med)', logo: 'brand/medcomix_logo_burst.svg' },
    techcomix: { name: 'tech.comix', url: 'https://instagram.com/tech.comix', c: 'var(--tech)', logo: 'brand/techcomix_burst.svg' },
    c360: { name: '360.comix', url: 'https://instagram.com/360.comix', c: 'var(--purple)', logo: 'brand/360comix_burst_256.webp' }
  };
  var YT = { MedComix: { name: 'Med Comix', url: 'https://youtube.com/@MedComix', c: 'var(--med)', logo: 'brand/medcomix_logo_burst.svg' } };

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
  function fmtMetric(key, v, tt) {
    var s = short(v);
    if (key === 'followers' && tt && tt.followers_min) s += '+';
    return s;
  }

  var counted = false, countTimer = null;
  function render(fresh) {
    var tt = totals(DATA);
    document.querySelectorAll('[data-stat]').forEach(function (el) {
      var k = el.getAttribute('data-stat');
      el.textContent = fmtMetric(k, tt[k], tt);
    });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var k = el.getAttribute('data-count');
      el.dataset.v = tt[k] || 0;
      if (counted || !countReady) el.textContent = fmtMetric(k, tt[k], tt);
    });
    var chLabel = document.querySelector('[data-count="channels"] + .tot-l');
    if (chLabel) chLabel.textContent = lang === 'ru' ? ruPlural(tt.channels || 0, 'канал', 'канала', 'каналов') : UZ['m.channels'];
    var up = document.getElementById('updated');
    if (up && DATA.updated_at) { up.textContent = when(DATA.updated_at); up.setAttribute('datetime', DATA.updated_at); }
    renderLineup();
    renderTop();
  }

  function statRow(label, value) { return '<div><dt>' + label + '</dt><dd>' + value + '</dd></div>'; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function safeUrl(u) { return /^https:\/\//.test(u || '') ? u : null; }

  function renderLineup() {
    var box = document.getElementById('lineup');
    if (!box) return;
    var d = DYN[lang], html = '', k = 0;
    Object.keys(CH).forEach(function (key) {
      var a = (DATA.instagram || {})[key], m = CH[key];
      if (!hasData(a)) return;
      var fol = a.followers == null ? null : short(a.followers) + (a.followers_min ? '+' : '');
      html += '<article class="can" style="--c:' + m.c + ';--k:' + k + ';--tilt:' + (k % 2 ? 4 : -4) + 'deg">' +
        '<div class="can-top"><img src="' + m.logo + '" alt="" width="66" height="66"><div><p class="can-name">' + m.name + '</p><p class="can-kind">' + d.instagram + '</p></div></div>' +
        '<dl class="can-stats">' +
        (fol ? statRow(d.followers, fol) : '') +
        statRow(d.views, short(a.views)) + statRow(d.likes, short(a.likes)) +
        statRow(d.comments, short(a.comments)) + statRow(d.shares, short(a.shares)) + statRow(d.saves, short(a.saves)) +
        '</dl><a class="can-link" href="' + m.url + '" target="_blank" rel="noopener">' + d.goto + '</a></article>';
      k++;
    });
    Object.keys(YT).forEach(function (key) {
      var y = (DATA.youtube || {})[key], m = YT[key];
      if (!hasData(y)) return;
      html += '<article class="can" style="--c:' + m.c + ';--k:' + k + ';--tilt:' + (k % 2 ? 4 : -4) + 'deg">' +
        '<div class="can-top"><img src="' + m.logo + '" alt="" width="66" height="66"><div><p class="can-name">' + m.name + '</p><p class="can-kind">' + d.youtube + '</p></div></div>' +
        '<dl class="can-stats">' + statRow(d.subscribers, short(y.subscribers)) + statRow(d.views, short(y.views)) + statRow(d.videos, short(y.videos)) +
        '</dl><a class="can-link" href="' + m.url + '" target="_blank" rel="noopener">' + d.goto + '</a></article>';
      k++;
    });
    box.innerHTML = html;
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
      var href = safeUrl(v.permalink) || m.url;
      var title = v.title || v.caption || '';
      var img = v.cover || safeUrl(v.thumb);
      var media = img
        ? '<img src="' + esc(img) + '" alt="" loading="lazy" decoding="async" onerror="this.outerHTML=\'<span class=&quot;vid-ph&quot;><img src=&quot;' + m.logo + '&quot; alt=&quot;&quot;></span>\'">'
        : '<span class="vid-ph"><img src="' + m.logo + '" alt=""><span class="vid-ph-t">' + esc(title) + '</span></span>';
      return '<a class="vid" style="--c:' + m.c + '" href="' + esc(href) + '" target="_blank" rel="noopener" aria-label="' + esc(title) + ' — ' + short(v.views) + ' ' + d.views + '">' + media +
        '<span class="vid-rank">' + (i + 1) + '</span>' +
        '<span class="vid-meta">' + (img ? '<span class="vid-t">' + esc(title) + '</span>' : '') +
        '<span class="vid-v"><svg class="ico-s" aria-hidden="true"><use href="#i-eye"/></svg>' + short(v.views) + '</span></span></a>';
    }).join('');
    fitTitles();
  }
  /* shrink a placeholder title until its longest word fits the tile */
  function fitTitles() {
    document.querySelectorAll('.vid-ph-t').forEach(function (el) {
      el.style.fontSize = ''; el.style.overflowWrap = '';
      var size = parseFloat(getComputedStyle(el).fontSize), guard = 0;
      while (el.scrollWidth > el.clientWidth + 1 && size > 10.5 && guard++ < 40) { size -= 0.5; el.style.fontSize = size + 'px'; }
      if (el.scrollWidth > el.clientWidth + 1) el.style.overflowWrap = 'anywhere'; // still too long: let the word break
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

  /* count-up when the totals come into view (once) */
  var countReady = false;
  function countUp() {
    if (counted) return;
    counted = true;
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
    var tt = totals(DATA), t0 = performance.now(), dur = 1300;
    function step(now) {
      var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      els.forEach(function (el) {
        var k = el.getAttribute('data-count'), v = +el.dataset.v || 0;
        el.textContent = fmtMetric(k, p < 1 ? v * e : v, tt);
      });
      if (p < 1) countTimer = requestAnimationFrame(step);
    }
    countTimer = requestAnimationFrame(step);
  }

  /* fetch fresh numbers: GitHub raw first (no Pages rebuild needed), then the local file */
  function load() {
    var urls = [RAW + '?t=' + Date.now(), 'data/stats.json?t=' + Date.now()];
    (function next(i) {
      if (i >= urls.length || !window.fetch) return;
      fetch(urls[i], { cache: 'no-store' }).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) {
        if (!d || !d.instagram) throw 0;
        if (!DATA.updated_at || !d.updated_at || d.updated_at >= DATA.updated_at) { DATA = d; render(true); }
      }).catch(function () { next(i + 1); });
    })(0);
  }

  /* ───────── service sheet ───────── */
  var sheet = document.getElementById('sheet');
  document.querySelectorAll('.svc').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!sheet || !sheet.showModal) { window.open(ADMIN, '_blank', 'noopener'); return; }
      document.getElementById('sheet-t').textContent = btn.querySelector('.svc-t').textContent;
      document.getElementById('sheet-d').textContent = btn.querySelector('.svc-d').textContent;
      var use = btn.querySelector('use'), su = sheet.querySelector('.sheet-ico use');
      su.setAttribute('href', use.getAttribute('href'));
      sheet.querySelector('.sheet-ico').style.setProperty('--c', btn.style.getPropertyValue('--c'));
      sheet.showModal();
    });
  });
  if (sheet) {
    sheet.querySelector('.sheet-x').addEventListener('click', function () { sheet.close(); });
    sheet.addEventListener('click', function (e) { if (e.target === sheet) sheet.close(); });
  }

  /* ───────── scroll scenes ───────── */
  var rmq = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  function applyRM() { root.classList.toggle('rm', !!rmq.matches); }
  applyRM();
  if (rmq.addEventListener) rmq.addEventListener('change', function () { applyRM(); fitScenes(); tick(); });

  var hero = document.querySelector('[data-scene="hero"]');
  var boom = document.querySelector('[data-scene="boom"]');
  var heroStage = hero && hero.querySelector('.stage');
  var panels = hero ? Array.prototype.slice.call(hero.querySelectorAll('.panel')) : [];
  var deg = hero && hero.querySelector('.deg');
  var hint = hero && hero.querySelector('.scroll-hint');
  var grid = boom && boom.querySelector('.svc-grid');
  var chips = grid ? Array.prototype.slice.call(grid.querySelectorAll('li:not(.boom-core)')) : [];
  var core = boom && boom.querySelector('.boom-core');
  var pow = core && core.querySelector('.pow');
  var forced = false;

  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
  function easeInOut(x) { return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
  function easeOutBack(x) { var c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); }
  function active(scene) { return scene && !root.classList.contains('rm') && !scene.classList.contains('static'); }
  function progress(scene) {
    var r = scene.getBoundingClientRect(), total = scene.offsetHeight - window.innerHeight;
    return total > 0 ? clamp(-r.top / total, 0, 1) : 0;
  }

  /* if a stage's content is taller than the screen, drop the sticky effect for it */
  function fitScenes() {
    [hero, boom].forEach(function (s) {
      if (!s) return;
      s.classList.remove('static');
      if (root.classList.contains('rm')) return;
      var st = s.querySelector('.stage');
      var pad = parseFloat(getComputedStyle(st).paddingBottom) || 0;
      var need = 0;
      // only real content counts (the decorative rays are allowed to spill and get clipped)
      s.querySelectorAll('[data-fit]').forEach(function (el) { need = Math.max(need, el.offsetTop + el.offsetHeight); });
      if (need + pad > st.clientHeight + 4) s.classList.add('static');
    });
    measure();
    tick();
  }

  function measure() {
    if (!grid) return;
    var cx = grid.clientWidth / 2, cy = grid.clientHeight / 2;
    chips.forEach(function (li, i) {
      li._dx = cx - (li.offsetLeft + li.offsetWidth / 2);
      li._dy = cy - (li.offsetTop + li.offsetHeight / 2);
      li._r = ((i * 47) % 50) - 25;
    });
  }

  var lastStep = -1;
  function tick() {
    ticking = false;
    if (hero) {
      if (active(hero)) {
        var p = progress(hero);
        var rot = easeInOut(clamp(p / 0.9, 0, 1)) * 360;
        heroStage.style.setProperty('--rot', rot.toFixed(2));
        if (deg) deg.textContent = Math.round(rot) + '°';
        var stepNow = p < 0.3 ? 0 : p < 0.64 ? 1 : 2;
        if (stepNow !== lastStep) {
          panels.forEach(function (pn, i) { pn.classList.toggle('is-on', i === stepNow); pn.setAttribute('aria-hidden', String(i !== stepNow)); });
          lastStep = stepNow;
        }
        if (hint) hint.classList.toggle('gone', p > 0.03);
      } else {
        heroStage.style.removeProperty('--rot');
        panels.forEach(function (pn) { pn.classList.add('is-on'); pn.removeAttribute('aria-hidden'); });
        lastStep = -1;
      }
    }
    if (boom && grid) {
      if (active(boom) && !forced) {
        var q = progress(boom);
        // core: pops in, shakes, then bursts
        var ein = clamp(q / 0.1, 0, 1), eout = clamp((q - 0.2) / 0.12, 0, 1);
        var shake = q > 0.1 && q < 0.2 ? Math.sin(q * 260) * 7 : 0;
        core.style.opacity = String(ein * (1 - eout));
        core.style.transform = 'scale(' + (0.4 + 0.6 * easeOutBack(ein) + 0.5 * eout) + ') rotate(' + (shake - 12 + 12 * ein) + 'deg)';
        pow.style.opacity = String(q > 0.13 ? 1 - eout : 0);
        chips.forEach(function (li, i) {
          var e = clamp((q - 0.18 - i * 0.018) / 0.3, 0, 1);
          if (e >= 1) { li.style.transform = ''; li.style.opacity = ''; return; }
          var k = easeOutBack(e), inv = 1 - k;
          li.style.transform = 'translate(' + (li._dx * inv).toFixed(1) + 'px,' + (li._dy * inv).toFixed(1) + 'px) rotate(' + (li._r * inv).toFixed(1) + 'deg) scale(' + (0.3 + 0.7 * k).toFixed(3) + ')';
          li.style.opacity = String(clamp(e * 4, 0, 1));
        });
      } else {
        chips.forEach(function (li) { li.style.transform = ''; li.style.opacity = ''; });
        if (core) { core.style.opacity = '0'; }
      }
    }
  }
  var ticking = false;
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  var rz;
  window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { fitScenes(); fitTitles(); }, 120); });
  if (grid) grid.addEventListener('focusin', function () { forced = true; tick(); });

  /* reveal-once observers: channel lineup and count-up */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        if (en.target.id === 'lineup') en.target.classList.add('in');
        if (en.target.id === 'totals' && !root.classList.contains('rm')) countUp();
        io.unobserve(en.target);
      });
    }, { threshold: 0.25 });
    var lu = document.getElementById('lineup'), tot = document.getElementById('totals');
    if (lu) io.observe(lu);
    if (tot && !root.classList.contains('rm')) { countReady = true; io.observe(tot); }
  } else {
    var l2 = document.getElementById('lineup'); if (l2) l2.classList.add('in');
  }

  /* start */
  if (lang !== 'uz') setLang(lang); else render(false);
  if (countReady) document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = '0'; });
  fitScenes();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fitScenes(); fitTitles(); });
  window.addEventListener('load', fitScenes);
  load();
})();
