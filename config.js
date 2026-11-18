// Royale - Wedding Invitation Configuration for Bhavikunwar & Dhawalsingh
(function () {
  const params = new URLSearchParams(location.search);
  const mode = params.has('edit') ? 'edit' : params.has('preview') ? 'preview' : 'view';
  const trial = false;
  const TRIAL_EDITABLE = ['invocation.religion', 'brideName', 'groomName'];
  const STORAGE_KEY = 'royaleConfig_BhavikunwarDhawalsingh_v1';

  const SYMBOLS = [
    { id: 'ganesha', label: 'Ganesha', src: 'symbols/_ganesha.svg' },
    { id: 'buddha', label: 'Buddha', src: 'symbols/_buddha.svg' },
    { id: 'sindhi', label: 'Jhulelal', src: 'symbols/_sindhi.svg' },
    { id: 'sikh', label: 'Ik Onkar', src: 'symbols/_sikh.svg' },
    { id: 'jain', label: 'Ahimsa symbol', src: 'symbols/_jain.svg' },
    { id: 'buddhist', label: 'Dharma wheel', src: 'symbols/_buddhist.svg' },
    { id: 'parsi', label: 'Faravahar', src: 'symbols/_parsi.svg' },
    { id: 'christian', label: 'Cross', src: 'symbols/_christian.svg' },
    { id: 'none', label: 'None', src: '' },
  ];

  const INVOCATIONS = {
    hindu: {
      label: 'Hindu',
      english: 'Shri Ganeshaya Namah',
      scripts: {
        devanagari: { label: 'Devanagari (Hindi/Marathi/Sanskrit/Nepali)', text: 'श्री गणेशाय नमः', font: 'Tiro Devanagari Sanskrit' },
        gujarati: { label: 'Gujarati', text: 'શ્રી ગણેશાય નમઃ', font: 'Noto Sans Gujarati' },
      },
    },
    sikh: {
      label: 'Sikh',
      english: 'Ik Onkar, Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh',
      scripts: {
        gurmukhi: { label: 'Gurmukhi', text: 'ੴ ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ, ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਹਿ', font: 'Noto Sans Gurmukhi' },
      },
    },
    jain: {
      label: 'Jain',
      english: 'Namo Arihantanam',
      scripts: {
        devanagari: { label: 'Devanagari', text: 'नमो अरिहंताणं', font: 'Tiro Devanagari Sanskrit' },
      },
    },
  };

  function symbolById(id) {
    for (let i = 0; i < SYMBOLS.length; i++) if (SYMBOLS[i].id === id) return SYMBOLS[i];
    return SYMBOLS[0];
  }

  function invocationLines(inv) {
    const sel = inv && inv.script;
    if (sel === 'custom') {
      return {
        religion: (inv && inv.religion) || 'hindu', script: 'custom',
        text: (inv && inv.custom) || '', font: '', rtl: false, isEnglish: false, isCustom: true,
      };
    }
    if (sel === 'blank') {
      return {
        religion: (inv && inv.religion) || 'hindu', script: 'blank',
        text: '', font: '', rtl: false, isEnglish: false, isBlank: true,
      };
    }
    const religion = INVOCATIONS[(inv && inv.religion)] ? inv.religion : 'hindu';
    const rel = INVOCATIONS[religion];
    const scriptKeys = Object.keys(rel.scripts);
    let chosen;
    if (sel === 'english') chosen = 'english';
    else if (sel && rel.scripts[sel]) chosen = sel;
    else chosen = scriptKeys.length ? scriptKeys[0] : 'english';

    if (chosen === 'english') {
      return { religion: religion, script: 'english', text: rel.english || '', font: '', rtl: false, isEnglish: true };
    }
    const scr = rel.scripts[chosen];
    return { religion: religion, script: chosen, text: scr.text, font: scr.font, rtl: !!scr.rtl, isEnglish: false };
  }

  const VIVAAH_ISO = '2026-12-12';

  const GALLERY_STARTERS = [
    { type: 'landscape', image: '1.png', placeholder: false, caption: '#howitstarted', hang: 118 },
    { type: 'landscape', image: '2.png', placeholder: false, caption: '#adventures', hang: 150 },
    { type: 'story', text: 'Some stories begin with grand gestures. Ours started with a simple conversation.', hang: 86 },
    { type: 'portrait', image: '3.png', placeholder: false, caption: '#thelittlethings', hang: 132 },
    { type: 'portrait', image: '4.png', placeholder: false, caption: '#everyday', hang: 100 },
    { type: 'story', text: "Friendship grew into something more, and we realized life's best moments were the ones we shared together.", hang: 120 },
    { type: 'portrait', image: '5.png', placeholder: false, caption: '#foreverbegins', hang: 150 },
    { type: 'portrait', image: '6.png', placeholder: false, caption: '#usforever', hang: 92 },
  ];

  const DEFAULTS = {
    version: 1,
    finalized: true,

    invocation: { symbol: 'ganesha', religion: 'hindu', script: 'devanagari', custom: '' },

    brideName: 'Bhavikunwar',
    groomName: 'Dhawalsingh',
    title: 'Bhavikunwar & Dhawalsingh',
    hostNames: ['Bhavikunwar', 'Dhawalsingh'],

    introNote: 'we cordially invite you to grace the auspicious occasion of the marriage of…',

    eventISO: VIVAAH_ISO,
    revealButton: 'Reveal the Date',
    revealAfter: 'Save the Date',

    groomFamily: {
      enabled: true,
      name: 'Chi. Dhawalsingh Dahiya',
      relLabel: 'Son of',
      parentA: 'Shri Paresh Singh Daya (Dahiya)',
      parentB: 'Smt. Hinawarkunwar',
      grandLabel: '',
      grandA: '',
      grandB: '',
    },
    brideFamily: {
      enabled: true,
      name: 'Kum. Bhavikunwar',
      relLabel: 'Daughter of',
      parentA: 'Shri Dinesh Singh Bhati',
      parentB: 'Smt. Gayatrikunwar',
      grandLabel: '',
      grandA: '',
      grandB: '',
    },

    gallery: {
      enabled: true,
      items: GALLERY_STARTERS,
    },

    ceremonies: [
      {
        name: 'Ganesh and Gruhshanti Rituals',
        art: 'media/gruhshanti.png',
        date: '2026-12-10',
        time: '07:00',
        venue: '3, Nandbag Soc, Nr. Shrinath Partyplot, Nikol, Ahmedabad 382350',
        mapUrl: 'https://maps.app.goo.gl/fmoqbroVXpqxZF8a8?g_st=iw',
        enabled: true
      },
      {
        name: 'Sangeet',
        art: 'media/sangeet.webp',
        date: '2026-12-10',
        time: '21:00',
        venue: '3, Nandbag Soc, Nr. Shrinath Partyplot, Nikol, Ahmedabad 382350',
        mapUrl: 'https://maps.app.goo.gl/fmoqbroVXpqxZF8a8?g_st=iw',
        enabled: true
      },
      {
        name: 'Haldi',
        art: 'media/haldi.webp',
        date: '2026-12-11',
        time: '10:00',
        venue: '3, Nandbag Soc, Nr. Shrinath Partyplot, Nikol, Ahmedabad 382350',
        mapUrl: 'https://maps.app.goo.gl/fmoqbroVXpqxZF8a8?g_st=iw',
        enabled: true
      },
      {
        name: 'Wedding Day',
        art: 'media/vivaah.webp',
        date: '2026-12-12',
        time: '17:30',
        venue: 'Galaxy Hotel, Opp. 72 feet Balaji Bypass, Pali, Rajhasthan 306401',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Galaxy+Hotel%2C+Opp.+72+feet+Balaji+Bypass%2C+Pali%2C+Rajasthan+306401',
        enabled: true
      },
      {
        name: 'Reception',
        art: 'media/reception.webp',
        date: '2026-12-13',
        time: '19:00',
        venue: 'Shrinath Party Plot, Nikol, Ahmedabad 382350',
        mapUrl: 'https://maps.app.goo.gl/fmoqbroVXpqxZF8a8?g_st=iw',
        enabled: true
      }
    ],

    compliments: {
      enabled: true,
      lead: 'With Best Compliments From:',
      lines: [
        'Family and Friends',
        'Near & Dear Ones',
      ],
    },

    note: {
      enabled: true,
      lead: 'A Note From Us',
      text: 'We can’t wait to celebrate this special day with you. Thank you for being part of our journey.',
    },

    farewell: { line: 'Your Presence Means the World to Us' },

    social: { instagram: false, instagramUrl: '' },

    music: { enabled: true, src: 'music/Jashn-e-bahara Instrumental.mp3', volume: 0.6 },
  };

  function deepMerge(base, over) {
    if (Array.isArray(base) || Array.isArray(over)) return over !== undefined ? over : base;
    if (typeof base !== 'object' || base === null) return over !== undefined ? over : base;
    if (typeof over !== 'object' || over === null) return base;
    const out = {};
    Object.keys(base).forEach((k) => { out[k] = deepMerge(base[k], over[k]); });
    Object.keys(over).forEach((k) => { if (!(k in base)) out[k] = over[k]; });
    return out;
  }

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved) return deepMerge(DEFAULTS, saved);
    } catch (_) {}
    return deepMerge(DEFAULTS, {});
  }

  function syncDerived() {
    const cfg = window.Royale.config;
    const bride = (cfg.brideName || '').trim();
    const groom = (cfg.groomName || '').trim();
    cfg.title = bride && groom ? bride + ' & ' + groom : (bride || groom || 'Our Wedding');
    cfg.hostNames = [bride, groom].filter(Boolean);
  }

  function save() {
    syncDerived();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(window.Royale.config));
      return true;
    } catch (_) {
      return false;
    }
  }

  function reset() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
  }

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
  ));

  const nl2br = (s) => esc(s).replace(/\n/g, '<br />');

  function guestName() {
    return (params.get('to') || 'Family & Friends').trim().slice(0, 80);
  }

  function fmtDate(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    if (!m) return '';
    const d = new Date(+m[1], +m[2] - 1, +m[3]);
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  }

  function fmtTime(hhmm) {
    const m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm || ''));
    if (!m) return '';
    return new Date(2000, 0, 1, +m[1], +m[2])
      .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  function mapLink(c) {
    const own = ((c && c.mapUrl) || '').trim();
    if (own) return own;
    const venue = ((c && c.venue) || '').trim();
    return venue ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(venue) : '';
  }

  const CUSTOM_CEREMONY_MAX = 5;
  const CEREMONY_ZOOM_MIN = 0.3;

  function ceremonyLive(c) {
    if (!c || c.enabled === false) return false;
    if (!c.custom) return true;
    return !!((c.art || '').trim() && (c.name || '').trim());
  }

  function ceremoniesByDate(list) {
    const when = (c) => (/^\d{4}-\d{2}-\d{2}$/.test(c.date || '') ? c.date : '9999-99-99') + ' ' + (c.time || '');
    return (Array.isArray(list) ? list : []).slice().sort((a, b) => when(a).localeCompare(when(b)));
  }

  function addDaysISO(iso, days) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    if (!m) return iso;
    const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    d.setUTCDate(d.getUTCDate() + days);
    return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
  }

  window.Royale = {
    mode,
    trial: false,
    TRIAL_EDITABLE,
    canEdit: function (path) { return mode === 'edit'; },
    config: load(),
    DEFAULTS,
    SYMBOLS,
    INVOCATIONS,
    symbolById,
    invocationLines,
    STORAGE_KEY,
    addDaysISO,
    save,
    reset,
    syncDerived,
    esc,
    nl2br,
    guestName,
    fmtDate,
    fmtTime,
    mapLink,
    CUSTOM_CEREMONY_MAX,
    CEREMONY_ZOOM_MIN,
    ceremonyLive,
    ceremoniesByDate,
  };

  if (mode === 'edit') document.body.classList.add('is-editing');
  if (mode === 'preview') document.body.classList.add('is-previewing');
})();
