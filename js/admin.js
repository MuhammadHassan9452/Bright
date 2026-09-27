/* ============================================
   BRIGHT PATH - Admin System
   Client-side admin with localStorage persistence
   ============================================ */

(function () {
  'use strict';

  /* ======== DEFAULT ADMIN CREDENTIALS ======== */
  const DEFAULT_ADMIN = {
    email: 'brightpathinternationaledu@gmail.com',
    password: 'BrightPath@2025'
  };

  /* ======== DEFAULT SCHOLARSHIPS (9 images) ======== */
  const DEFAULT_SCHOLARSHIPS = [
    {
      id: 's1',
      image: 'Qadeer Website/New Scholorship Oppurtunities/WhatsApp Image 2026-09-13 at 5.50.41 PM (1).jpeg',
      title: 'University Merit Award 2025',
      subtitle: 'Top 200 University \u00b7 Full Tuition + Stipend',
      category: 'Full Funding'
    },
    {
      id: 's2',
      image: 'Qadeer Website/New Scholorship Oppurtunities/WhatsApp Image 2026-09-13 at 5.50.41 PM (2).jpeg',
      title: 'Beijing Province Scholarship',
      subtitle: 'Beijing \u00b7 50% - 80% Tuition Waiver',
      category: 'Partial'
    },
    {
      id: 's3',
      image: 'Qadeer Website/New Scholorship Oppurtunities/WhatsApp Image 2026-09-13 at 5.50.41 PM (3).jpeg',
      title: 'Shanghai Excellent Student Grant',
      subtitle: 'Shanghai \u00b7 Full Tuition + Housing + Stipend',
      category: 'Full Funding'
    },
    {
      id: 's4',
      image: 'Qadeer Website/New Scholorship Oppurtunities/WhatsApp Image 2026-09-13 at 5.50.41 PM.jpeg',
      title: 'International Excellence Award',
      subtitle: 'C9 League \u00b7 30 Seats Left \u00b7 Full Coverage',
      category: 'Limited Seats'
    },
    {
      id: 's5',
      image: 'Qadeer Website/New Scholorship Oppurtunities/WhatsApp Image 2026-09-13 at 5.51.15 PM.jpeg',
      title: 'Research Assistantship Program',
      subtitle: 'Lab Research Masters/PhD \u00b7 Tuition + Stipend',
      category: 'Partial'
    },
    {
      id: 's6',
      image: 'Qadeer Website/New Scholorship Oppurtunities/WhatsApp Image 2026-09-13 at 5.51.43 PM (1).jpeg',
      title: 'Silk Road Scholarship BRI',
      subtitle: 'BRI Countries \u00b7 100% Funding \u00b7 50+ Majors',
      category: 'Full Funding'
    },
    {
      id: 's7',
      image: 'Qadeer Website/New Scholorship Oppurtunities/WhatsApp Image 2026-09-13 at 5.51.43 PM (2).jpeg',
      title: 'South Asian Students Award',
      subtitle: 'Pakistan/Bangladesh/India \u00b7 15 Spots',
      category: 'Limited Seats'
    },
    {
      id: 's8',
      image: 'Qadeer Website/New Scholorship Oppurtunities/WhatsApp Image 2026-09-13 at 5.51.43 PM (3).jpeg',
      title: 'African Students Tuition Grant',
      subtitle: 'African Nations \u00b7 40% - 70% Tuition Reduction',
      category: 'Partial'
    },
    {
      id: 's9',
      image: 'Qadeer Website/New Scholorship Oppurtunities/WhatsApp Image 2026-09-13 at 5.51.43 PM.jpeg',
      title: 'CSC Nomination - Partner Track',
      subtitle: 'MOE CSC Direct Nomination \u00b7 100% Covered',
      category: 'Full Funding'
    }
  ];

  const GALLERY_ZOOM_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>';

  const SESSION_KEY = 'bp_admin_session';
  const CREDS_KEY = 'bp_admin_credentials';
  const DATA_KEY = 'bp_scholarships';
  const GUARD_KEY = 'bp_admin_last_flush';
  const FORCE_WIPE_KEYS = [
    SESSION_KEY,
    CREDS_KEY,
    GUARD_KEY,
    'bp_admin_flush_v'
  ];

  function safeGetStores() {
    var stores = [];
    try {
      if (typeof sessionStorage !== 'undefined' && sessionStorage) {
        try {
          var _t = '__bp_probe_' + Date.now();
          sessionStorage.setItem(_t, '1');
          sessionStorage.removeItem(_t);
          stores.push(sessionStorage);
        } catch (_e) {}
      }
    } catch (_e) {}
    try {
      if (typeof localStorage !== 'undefined' && localStorage) {
        try {
          var _t2 = '__bp_probe2_' + Date.now();
          localStorage.setItem(_t2, '1');
          localStorage.removeItem(_t2);
          stores.push(localStorage);
        } catch (_e) {}
      }
    } catch (_e) {}
    return stores;
  }

  (function aggressiveFlushAdminAuthKeys() {
    try {
      var fullPath = '';
      try { fullPath = (window.location.pathname || '') + (window.location.href || ''); } catch (_e) {}
      var isLoginPage = /admin-login\.html/i.test(fullPath);

      var stores = safeGetStores();

      if (isLoginPage) {
        FORCE_WIPE_KEYS.forEach(function (key) {
          stores.forEach(function (store) {
            try { store.removeItem(key); } catch (_e) {}
          });
        });
        try {
          if (typeof localStorage !== 'undefined' && localStorage) {
            FORCE_WIPE_KEYS.forEach(function (k) { try { localStorage.removeItem(k); } catch(_e){} });
          }
        } catch (_e) {}
        try {
          if (typeof sessionStorage !== 'undefined' && sessionStorage) {
            FORCE_WIPE_KEYS.forEach(function (k) { try { sessionStorage.removeItem(k); } catch(_e){} });
          }
        } catch (_e) {}
      } else {
          var CREDS_ONLY = [CREDS_KEY, GUARD_KEY, 'bp_admin_flush_v'];
          CREDS_ONLY.forEach(function (key) {
            stores.forEach(function (store) {
              try { store.removeItem(key); } catch (_e) {}
            });
          });
          try {
            if (typeof localStorage !== 'undefined' && localStorage) {
              CREDS_ONLY.forEach(function (k) { try { localStorage.removeItem(k); } catch(_e){} });
            }
          } catch (_e) {}
          try {
            if (typeof sessionStorage !== 'undefined' && sessionStorage) {
              CREDS_ONLY.forEach(function (k) { try { sessionStorage.removeItem(k); } catch(_e){} });
            }
          } catch (_e) {}
        }
    } catch (_e) {}
  })();

  function getStores() {
    return safeGetStores();
  }

  function removeSessionKeyFromAllStores() {
    var stores = getStores();
    stores.forEach(function (store) {
      try {
        if (store && typeof store.removeItem === 'function') {
          store.removeItem(SESSION_KEY);
        }
      } catch (e) {}
    });
  }

  function readJSON(key, fallback) {
    var stores = getStores();

    for (var i = 0; i < stores.length; i++) {
      try {
        var raw = stores[i].getItem(key);
        if (raw !== null && raw !== undefined) {
          return JSON.parse(raw);
        }
      } catch (e) {
        // keep trying the next storage layer
      }
    }

    return fallback;
  }
  function writeJSON(key, val) {
    var payload = JSON.stringify(val);
    var ok = false;

    var stores = getStores();

    for (var i = 0; i < stores.length; i++) {
      try {
        stores[i].setItem(key, payload);
        ok = true;
      } catch (e) {}
    }

    try {
      localStorage.setItem(GUARD_KEY, String(Date.now()));
    } catch (e) {}

    return ok;
  }

  /* ======== STORAGE HELPERS ======== */
  const Storage = {
    getAdmin: function () {
      var stores = getStores();
      stores.forEach(function (store) {
        try {
          if (store && typeof store.removeItem === 'function') {
            store.removeItem(CREDS_KEY);
          }
        } catch (e) {}
      });
      return DEFAULT_ADMIN;
    },
    setAdmin: function (creds) {
      writeJSON(CREDS_KEY, creds);
    },
    getScholarships: function () {
      var stored = readJSON(DATA_KEY, null);
      if (stored) return stored;
      writeJSON(DATA_KEY, DEFAULT_SCHOLARSHIPS);
      return DEFAULT_SCHOLARSHIPS;
    },
    setScholarships: function (list) {
      writeJSON(DATA_KEY, list);
    },
    getSession: function () {
      var stores = getStores();
      var best = null;

      stores.forEach(function (store) {
        if (!store || typeof store.getItem !== 'function') return;

        try {
          var raw = store.getItem(SESSION_KEY);
          if (!raw) return;
          var parsed = JSON.parse(raw);
          if (!parsed || !parsed.email) return;

          var hasExpired = !parsed.expiresAt || parsed.expiresAt < Date.now();
          var tooOld = !!(parsed.issuedAt && parsed.issuedAt < Date.now() - (1000 * 60 * 60 * 24 * 30));

          if (hasExpired || tooOld) {
            try { store.removeItem(SESSION_KEY); } catch (e) {}
            return;
          }

          if (!best || (parsed.issuedAt || 0) > (best.issuedAt || 0)) {
            best = parsed;
          }
        } catch (e) {
          try { store.removeItem(SESSION_KEY); } catch (e) {}
        }
      });

      if (!best) {
        removeSessionKeyFromAllStores();
        return null;
      }

      // Keep the newest valid session in both stores so stale data cannot win the redirect check.
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(best));
      } catch (e) {}
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(best));
      } catch (e) {}

      return best;
    },
    setSession: function (email) {
      var now = Date.now();
      var session = {
        email: email,
        issuedAt: now,
        expiresAt: now + (1000 * 60 * 60 * 12) // 12 hours
      };
      writeJSON(SESSION_KEY, session);
      try { sessionStorage.setItem(GUARD_KEY, String(now)); } catch (e) {}
      // Verify write
      for (var i = 0; i < 3; i++) {
        var back = readJSON(SESSION_KEY, null);
        if (back && back.email === email) return true;
        try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (e) {}
      }
      return true;
    },
    clearSession: function () {
      removeSessionKeyFromAllStores();
      try { localStorage.removeItem(GUARD_KEY); } catch (e) {}
      try { sessionStorage.removeItem(GUARD_KEY); } catch (e) {}
    }
  };

  /* ======== AUTH HELPERS ======== */
  function stripQuery(url) {
    if (!url) return '';
    var q = url.indexOf('?');
    return q >= 0 ? url.slice(0, q) : url;
  }
  function basename(path) {
    if (!path) return '';
    var slash = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));
    var last = slash >= 0 ? path.slice(slash + 1) : path;
    return stripQuery(last).toLowerCase();
  }
  function normalizeRedirect(path) {
    if (!path) return 'admin-dashboard.html';
    var b = basename(path);
    if (!b || b === 'admin-login.html') return 'admin-dashboard.html';
    return path;
  }
  function clearAllAdminState() {
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
    try { localStorage.removeItem(CREDS_KEY); } catch (e) {}
    try { sessionStorage.removeItem(CREDS_KEY); } catch (e) {}
    try { localStorage.removeItem(DATA_KEY); } catch (e) {}
    try { sessionStorage.removeItem(DATA_KEY); } catch (e) {}
    try { localStorage.removeItem(GUARD_KEY); } catch (e) {}
    try { sessionStorage.removeItem(GUARD_KEY); } catch (e) {}
  }

  /**
   * Single synchronous check on dashboard / protected pages.
   * Avoid redirect loops by redirecting once and then stopping.
   */
  function requireLogin() {
    var path = (window.location.pathname || '') + (window.location.href || '');
    if (/admin-login\.html/i.test(path)) {
      return true;
    }

    if (window.__BP_ADMIN_REDIRECT_PENDING__) return false;

    var sess = Storage.getSession();
    if (sess) return true;

    removeSessionKeyFromAllStores();

    window.__BP_ADMIN_REDIRECT_PENDING__ = true;
    Storage.clearSession();
    var target = 'admin-login.html';
    setTimeout(function () {
      window.location.replace(target);
    }, 0);
    return false;
  }

  function login(email, password) {
    var ok = !!(email
      && typeof email === 'string'
      && password
      && email.trim().toLowerCase() === DEFAULT_ADMIN.email.toLowerCase()
      && password === DEFAULT_ADMIN.password);
    if (ok) {
      try {
        var stores = safeGetStores();
        FORCE_WIPE_KEYS.forEach(function (key) {
          stores.forEach(function (store) {
            try { store.removeItem(key); } catch (_e) {}
          });
        });
      } catch (_e) {}
      var sessionEmail = email.trim().toLowerCase();
      Storage.setSession(sessionEmail);
      var verify = Storage.getSession();
      if (!verify || verify.email !== sessionEmail) {
        Storage.clearSession();
        try { clearAllAdminState(); } catch (_e) {}
        return { ok: false, message: 'Your browser is blocking session storage. Please enable cookies/site data and try again.' };
      }
      return { ok: true };
    }
    try { clearAllAdminState(); } catch (_e) {}
    return { ok: false, message: 'Invalid email or password.' };
  }

  function logout() {
    clearAllAdminState();
    try { window.history.replaceState(null, 'Admin Login', 'admin-login.html'); } catch (e) {}
    setTimeout(function () { window.location.replace('admin-login.html'); }, 0);
  }

  /* ======== SCHOLARSHIP CRUD ======== */
  function addScholarship(scholarship) {
    const list = Storage.getScholarships();
    const newItem = Object.assign({
      id: 's_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
    }, scholarship);
    list.push(newItem);
    Storage.setScholarships(list);
    return newItem;
  }

  function removeScholarship(id) {
    const list = Storage.getScholarships();
    const filtered = list.filter(function (s) { return s.id !== id; });
    Storage.setScholarships(filtered);
    return filtered.length !== list.length;
  }

  function resetScholarships() {
    Storage.setScholarships(DEFAULT_SCHOLARSHIPS);
    return DEFAULT_SCHOLARSHIPS;
  }

  /* ======== GALLERY RENDERING ======== */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderGallery(container, options) {
    options = options || {};
    const list = Storage.getScholarships();
    const filter = options.filter || 'All Postings';

    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = [
        '<div class="glass-card" style="padding: var(--space-7); text-align: center; grid-column: 1 / -1;">',
        '  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal-400)" stroke-width="1.5" style="margin-bottom: var(--space-3);"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>',
        '  <h4 style="color: var(--navy-800); margin: 0 0 var(--space-2);">No Scholarship Postings Yet</h4>',
        '  <p style="color: var(--charcoal-500); margin: 0; max-width: 500px; margin-left: auto; margin-right: auto; line-height: var(--lh-relaxed);">',
        '    There are no scholarship postings to display. Go to the Admin Dashboard to add new opportunities.',
        '  </p>',
        '</div>'
      ].join('');
      return;
    }

    container.innerHTML = list
      .filter(function (s) {
        if (filter === 'All Postings') return true;
        return s.category === filter;
      })
      .map(function (s) {
        const img = escapeHtml(s.image || '');
        const title = escapeHtml(s.title || 'Untitled Scholarship');
        const subtitle = escapeHtml(s.subtitle || '');
        const category = escapeHtml(s.category || 'Full Funding');
        const alt = escapeHtml(s.title || 'Scholarship Image');

        if (options.withDeleteButton) {
          return [
            '<div class="gallery-item" data-category="' + category + '" data-id="' + escapeHtml(s.id) + '" style="position: relative;">',
            '  <div class="admin-delete-btn" data-delete-id="' + escapeHtml(s.id) + '" title="Delete this scholarship" style="position:absolute;top:10px;right:10px;z-index:20;width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#ff6b6b,#ee5a6f);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(238,90,111,0.35);transition:transform .15s;">',
            '    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
            '  </div>',
            '  <img src="' + img + '" alt="' + alt + '" loading="lazy" onerror="this.style.background=\'#f5f5f7\';this.style.objectFit=\'contain\';this.style.padding=\'1rem\'">',
            '  <div class="gallery-item-overlay">',
            '    <div class="gallery-item-caption">',
            '      <div class="gallery-zoom">' + GALLERY_ZOOM_SVG + '</div>',
            '      <div><h5>' + title + '</h5><span>' + subtitle + '</span></div>',
            '    </div>',
            '  </div>',
            '</div>'
          ].join('');
        }

        return [
          '<div class="gallery-item" data-category="' + category + '">',
          '  <img src="' + img + '" alt="' + alt + '" loading="lazy" onerror="this.style.background=\'#f5f5f7\';this.style.objectFit=\'contain\';this.style.padding=\'1rem\'">',
          '  <div class="gallery-item-overlay">',
          '    <div class="gallery-item-caption">',
          '      <div class="gallery-zoom">' + GALLERY_ZOOM_SVG + '</div>',
          '      <div><h5>' + title + '</h5><span>' + subtitle + '</span></div>',
          '    </div>',
          '  </div>',
          '</div>'
        ].join('');
      }).join('');

    if (options.withDeleteButton && typeof options.onDelete === 'function') {
      container.querySelectorAll('[data-delete-id]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          const id = btn.getAttribute('data-delete-id');
          options.onDelete(id, btn);
        });
      });
    }
  }

  /* ======== EXPORT ======== */
  window.BPAdmin = {
    Storage: Storage,
    DEFAULT_ADMIN: DEFAULT_ADMIN,
    DEFAULT_SCHOLARSHIPS: DEFAULT_SCHOLARSHIPS,
    normalizeRedirect: normalizeRedirect,
    requireLogin: requireLogin,
    login: login,
    logout: logout,
    addScholarship: addScholarship,
    removeScholarship: removeScholarship,
    resetScholarships: resetScholarships,
    renderGallery: renderGallery,
    escapeHtml: escapeHtml
  };
})();
