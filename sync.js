/* Cloud leaderboard sync — login / register, no client secret */
(function () {
  const PIN_KEY = 'fifa2026pin';
  const SESSION_KEY = 'fifa2026cloudsession';

  window._syncPlayers = [];
  window._syncLastFetch = null;
  window._syncLastSubmit = null;
  window._syncPendingApproval = false;
  window._syncLastSubmitError = '';
  window._syncPlayerStatus = '';
  window._authDialogMode = 'login';
  window._authFromSeal = false;
  window._authPromiseResolve = null;
  window._sealAfterAuthRoundId = null;

  function cfg() {
    return window.SYNC_CONFIG || {};
  }

  function isSyncEnabled() {
    const c = cfg();
    return !!(c.enabled && c.url);
  }

  function syncMetaKey(name) {
    const n = String(name || getCloudSessionName() || '').trim().toLowerCase();
    return n ? 'fifa2026syncmeta_' + n : 'fifa2026syncmeta_anon';
  }

  function loadSyncMeta(name) {
    try {
      const raw = localStorage.getItem(syncMetaKey(name));
      return raw ? JSON.parse(raw) : { submittedRounds: {} };
    } catch (e) {
      return { submittedRounds: {} };
    }
  }

  function saveSyncMeta(meta, name) {
    try {
      localStorage.setItem(syncMetaKey(name), JSON.stringify(meta));
    } catch (e) { /* ignore */ }
  }

  function markRoundSubmitted(roundId, name) {
    const n = name || getCloudSessionName();
    const meta = loadSyncMeta(n);
    meta.submittedRounds = meta.submittedRounds || {};
    meta.submittedRounds[roundId] = new Date().toISOString();
    saveSyncMeta(meta, n);
  }

  function wasRoundSubmitted(roundId) {
    if (!getCloudSessionName()) return false;
    return !!loadSyncMeta().submittedRounds?.[roundId];
  }

  function applyServerSubmittedRounds(roundIds, name) {
    if (!roundIds?.length) return;
    const meta = loadSyncMeta(name);
    meta.submittedRounds = meta.submittedRounds || {};
    roundIds.forEach(rid => {
      if (!meta.submittedRounds[rid]) meta.submittedRounds[rid] = 'server';
    });
    saveSyncMeta(meta, name);
  }

  function loadPlayerPin() {
    try { return localStorage.getItem(PIN_KEY) || ''; } catch (e) { return ''; }
  }

  function savePlayerPin(pin) {
    try { localStorage.setItem(PIN_KEY, pin); } catch (e) { /* ignore */ }
  }

  function clearPlayerPin() {
    try { localStorage.removeItem(PIN_KEY); } catch (e) { /* ignore */ }
  }

  function loadSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveSession(name, pin, status) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        name: String(name).trim(),
        status: status || 'pending',
        at: new Date().toISOString()
      }));
      savePlayerPin(pin);
    } catch (e) { /* ignore */ }
  }

  function clearSession() {
    try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* ignore */ }
    clearPlayerPin();
    window._syncPlayerStatus = '';
    window._syncPendingApproval = false;
  }

  function isCloudLoggedIn() {
    const s = loadSession();
    const pin = loadPlayerPin();
    return !!(s?.name && pin);
  }

  function getCloudSessionName() {
    return loadSession()?.name || '';
  }

  async function postJson(body) {
    const c = cfg();
    const res = await fetch(c.url, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body)
    });
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error('bad_response');
    }
  }

  function applyAuthSuccess(name, pin, data) {
    saveSession(name, pin, data.status);
    window._syncPlayerStatus = data.status;
    window._syncPendingApproval = data.status !== 'approved';
    window._syncLastSubmitError = '';
    applyServerSubmittedRounds(data.submittedRounds || [], name);

    const el = document.getElementById('playerName');
    if (el) el.value = name;
    if (typeof saveData === 'function') saveData(true);
    if (typeof updatePlayerNameField === 'function') updatePlayerNameField();
    if (typeof renderAll === 'function') renderAll();
  }

  async function syncLogin(name, pin) {
    if (!isSyncEnabled()) return { ok: false, disabled: true };
    const n = String(name || '').trim();
    const p = String(pin || '');
    if (!n) return { ok: false, error: 'no_name' };
    if (!p || p.length < 4 || p.length > 12) return { ok: false, error: 'bad_pin' };

    try {
      const data = await postJson({ action: 'login', name: n, pin: p });
      if (!data.ok) throw new Error(data.error || 'login failed');
      applyAuthSuccess(n, p, data);
      return data;
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }

  async function syncRegister(name, pin) {
    if (!isSyncEnabled()) return { ok: false, disabled: true };
    const n = String(name || '').trim();
    const p = String(pin || '');
    if (!n) return { ok: false, error: 'no_name' };
    if (!p || p.length < 4 || p.length > 12) return { ok: false, error: 'bad_pin' };

    try {
      const data = await postJson({ action: 'register', name: n, pin: p });
      if (!data.ok) throw new Error(data.error || 'register failed');
      applyAuthSuccess(n, p, data);
      return data;
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }

  function syncLogout() {
    clearSession();
    if (typeof updateCloudLoginUI === 'function') updateCloudLoginUI();
    if (typeof renderCloudSyncStatus === 'function') renderCloudSyncStatus();
    if (typeof updatePlayerNameField === 'function') updatePlayerNameField();
  }

  async function syncFetchLeaderboard() {
    if (!isSyncEnabled()) return { ok: false, disabled: true };
    const c = cfg();
    const url = c.url + (c.url.includes('?') ? '&' : '?') + 'action=leaderboard';
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'fetch failed');
      window._syncPlayers = data.players || [];
      window._syncLastFetch = new Date();
      return { ok: true, count: window._syncPlayers.length };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }

  async function syncSubmitRound(roundId, coupon) {
    if (!isSyncEnabled()) return { ok: false, disabled: true };
    if (!isCloudLoggedIn()) return { ok: false, error: 'not_logged_in' };
    if (wasRoundSubmitted(roundId)) return { ok: false, error: 'already_submitted' };

    const name = getCloudSessionName();
    const pin = loadPlayerPin();
    if (!name || !pin) return { ok: false, error: 'no_auth' };

    const safeCoupon = typeof stripPinFromCouponCode === 'function'
      ? stripPinFromCouponCode(coupon) : coupon;

    const body = {
      action: 'submit',
      name,
      pin,
      coupon: safeCoupon,
      roundId,
      roundLabel: typeof roundLabel === 'function' ? roundLabel(roundId) : roundId
    };

    try {
      const data = await postJson(body);
      if (!data.ok) throw new Error(data.error || 'submit failed');
      window._syncLastSubmit = new Date();
      window._syncPendingApproval = !!data.pendingApproval;
      window._syncPlayerStatus = data.pendingApproval ? 'pending' : 'approved';
      window._syncLastSubmitError = '';
      markRoundSubmitted(roundId, name);
      return data;
    } catch (e) {
      window._syncLastSubmitError = e.message;
      return { ok: false, error: e.message };
    }
  }

  function getSyncCoupons() {
    return (window._syncPlayers || []).map(p => p.coupon).filter(Boolean);
  }

  function mergeLeaderboardCodes() {
    return getSyncCoupons();
  }

  function canViewOthersPrediction(matchId) {
    if (typeof getMatchActual === 'function' && getMatchActual(matchId)) return true;
    if (typeof isKickoffLockActive === 'function' && isKickoffLockActive(matchId)) return true;
    return false;
  }

  function isMatchBetsViewable(matchId) {
    return canViewOthersPrediction(matchId);
  }

  function setAuthDialogMode(mode) {
    window._authDialogMode = mode;
    const title = document.getElementById('cloud-auth-title');
    const hint = document.getElementById('cloud-auth-hint');
    const confirmWrap = document.getElementById('cloud-auth-pin2-wrap');
    const submitBtn = document.getElementById('cloud-auth-submit');
    const tabLogin = document.getElementById('cloud-auth-tab-login');
    const tabRegister = document.getElementById('cloud-auth-tab-register');
    const errEl = document.getElementById('cloud-auth-error');
    if (errEl) errEl.textContent = '';

    if (tabLogin) tabLogin.classList.toggle('active', mode === 'login');
    if (tabRegister) tabRegister.classList.toggle('active', mode === 'register');
    if (confirmWrap) confirmWrap.style.display = mode === 'register' ? '' : 'none';
    if (title) {
      title.textContent = typeof t === 'function'
        ? t(mode === 'register' ? 'cloud_register_title' : 'cloud_login_title')
        : (mode === 'register' ? 'Create account' : 'Log in');
    }
    if (hint) {
      hint.textContent = typeof t === 'function'
        ? t(mode === 'register' ? 'cloud_register_hint' : 'cloud_login_hint_short')
        : '';
    }
    if (submitBtn) {
      submitBtn.textContent = typeof t === 'function'
        ? t(mode === 'register' ? 'cloud_register_submit' : 'cloud_login_submit')
        : (mode === 'register' ? 'Create' : 'Log in');
    }
  }

  function openCloudAuthDialog(opts) {
    opts = opts || {};
    const dlg = document.getElementById('cloud-auth-dialog');
    if (!dlg) return;
    window._authFromSeal = !!opts.fromSeal;
    const sealNote = document.getElementById('cloud-auth-seal-note');
    if (sealNote) sealNote.style.display = opts.fromSeal ? '' : 'none';

    const nameEl = document.getElementById('cloud-auth-name');
    const pinEl = document.getElementById('cloud-auth-pin');
    const pin2El = document.getElementById('cloud-auth-pin2');
    const mode = opts.mode || 'login';
    if (nameEl) {
      nameEl.value = mode === 'register' ? '' : (getCloudSessionName() || (typeof getPlayerName === 'function' ? getPlayerName() : ''));
    }
    if (pinEl) pinEl.value = '';
    if (pin2El) pin2El.value = '';

    const tabs = document.querySelector('.cloud-auth-tabs');
    if (tabs) tabs.style.display = (opts.registerOnly || opts.loginOnly) ? 'none' : '';

    setAuthDialogMode(opts.mode || 'login');
    if (typeof dlg.showModal === 'function') dlg.showModal();
  }

  function openCloudLoginDialog() {
    if (typeof openLoginChoiceDialog === 'function') openLoginChoiceDialog({});
    else openCloudAuthDialog({ mode: 'login' });
  }

  function openCloudRegisterDialog() {
    openCloudAuthDialog({ mode: 'register', registerOnly: true });
  }

  function closeCloudAuthDialog() {
    document.getElementById('cloud-auth-dialog')?.close();
    if (window._authPromiseResolve) {
      window._authPromiseResolve(false);
      window._authPromiseResolve = null;
    }
    window._authFromSeal = false;
    window._sealAfterAuthRoundId = null;
  }

  function finishAuthDialog(success) {
    document.getElementById('cloud-auth-dialog')?.close();
    if (typeof closeLoginChoiceDialog === 'function') closeLoginChoiceDialog();
    if (typeof closeCouponLoginDialog === 'function') closeCouponLoginDialog();
    if (window._authPromiseResolve) {
      window._authPromiseResolve(!!success);
      window._authPromiseResolve = null;
    }
    if (!success) {
      window._authFromSeal = false;
      window._sealAfterAuthRoundId = null;
    }
    updateCloudLoginUI();
    renderCloudSyncStatus();
    if (success && window._authFromSeal && window._sealAfterAuthRoundId) {
      const rid = window._sealAfterAuthRoundId;
      window._sealAfterAuthRoundId = null;
      window._authFromSeal = false;
      if (typeof continueSealRound === 'function') continueSealRound(rid);
    }
  }

  async function submitCloudAuth() {
    const nameEl = document.getElementById('cloud-auth-name');
    const pinEl = document.getElementById('cloud-auth-pin');
    const pin2El = document.getElementById('cloud-auth-pin2');
    const errEl = document.getElementById('cloud-auth-error');
    const mode = window._authDialogMode || 'login';
    const name = nameEl?.value?.trim() || '';
    const pin = pinEl?.value?.trim() || '';

    if (!name) {
      if (errEl) errEl.textContent = typeof t === 'function' ? t('alert_no_name') : 'Name required';
      return;
    }
    if (!pin || pin.length < 4) {
      if (errEl) errEl.textContent = typeof t === 'function' ? t('alert_no_pin') : 'PIN required';
      return;
    }
    if (mode === 'register') {
      const pin2 = pin2El?.value?.trim() || '';
      if (pin !== pin2) {
        if (errEl) errEl.textContent = typeof t === 'function' ? t('alert_pin_mismatch') : 'PIN mismatch';
        return;
      }
    }

    const res = mode === 'register' ? await syncRegister(name, pin) : await syncLogin(name, pin);
    if (!res.ok) {
      let msg = res.error || '?';
      if (res.error === 'Wrong PIN for this name') msg = typeof t === 'function' ? t('cloud_login_wrong_pin') : msg;
      if (res.error === 'Account not found') msg = typeof t === 'function' ? t('cloud_login_not_found') : msg;
      if (res.error === 'Name already taken — log in instead') msg = typeof t === 'function' ? t('cloud_register_taken') : msg;
      if (res.error === 'bad_pin' || res.error === 'bad_response') msg = typeof t === 'function' ? t('sync_submit_fail', { msg: res.error }) : msg;
      if (errEl) errEl.textContent = msg;
      return;
    }
    if (!window._authFromSeal && typeof alert === 'function') {
      const okMsg = mode === 'register'
        ? (typeof t === 'function' ? t('cloud_register_ok', { name }) : 'Account created')
        : (typeof t === 'function' ? t('cloud_login_ok', { name }) : 'Logged in');
      alert(okMsg);
    }
    finishAuthDialog(true);
  }

  function requireCloudAuthForSeal(roundId) {
    window._sealAfterAuthRoundId = roundId;
    return new Promise(resolve => {
      window._authPromiseResolve = resolve;
      if (typeof openLoginChoiceDialog === 'function') {
        openLoginChoiceDialog({ fromSeal: true });
      } else {
        openCloudAuthDialog({ mode: 'login', fromSeal: true });
      }
    });
  }

  function updateCloudLoginUI() {
    const loginBtn = document.getElementById('btn-cloud-login');
    const registerBtn = document.getElementById('btn-cloud-register');
    const chip = document.getElementById('cloud-user-chip');
    const logoutBtn = document.getElementById('btn-cloud-logout');
    if (!isSyncEnabled()) {
      [loginBtn, registerBtn, chip, logoutBtn].forEach(el => { if (el) el.style.display = 'none'; });
      return;
    }
    const session = loadSession();
    const loggedIn = session?.name && isCloudLoggedIn();
    if (loggedIn) {
      if (loginBtn) loginBtn.style.display = 'none';
      if (registerBtn) registerBtn.style.display = 'none';
      if (logoutBtn) logoutBtn.style.display = '';
      if (chip) {
        chip.style.display = '';
        const st = session.status === 'approved'
          ? (typeof t === 'function' ? t('cloud_status_approved') : '✓')
          : (typeof t === 'function' ? t('cloud_status_pending') : '⏳');
        chip.textContent = '☁️ ' + session.name + ' · ' + st;
      }
      window._syncPlayerStatus = session.status;
      window._syncPendingApproval = session.status !== 'approved';
    } else {
      if (loginBtn) loginBtn.style.display = '';
      if (registerBtn) registerBtn.style.display = '';
      if (logoutBtn) logoutBtn.style.display = (loadSession() || loadPlayerPin()) ? '' : 'none';
      if (chip) chip.style.display = 'none';
    }
  }

  function renderCloudSyncStatus() {
    const el = document.getElementById('cloud-sync-status');
    if (!el) return;
    if (!isSyncEnabled()) {
      el.textContent = typeof t === 'function' ? t('sync_cloud_off') : 'Cloud sync off';
      el.style.color = 'var(--muted)';
      return;
    }
    const parts = [];
    if (!isCloudLoggedIn()) {
      parts.push(typeof t === 'function' ? t('sync_cloud_guest') : 'Play locally — log in to sync');
    }
    if (window._syncLastFetch) {
      parts.push(typeof t === 'function'
        ? t('sync_cloud_ok', { n: (window._syncPlayers || []).length, time: window._syncLastFetch.toLocaleTimeString() })
        : 'Cloud: ' + window._syncPlayers.length);
    }
    if (window._syncPendingApproval) {
      parts.push(typeof t === 'function' ? t('sync_cloud_pending') : 'Awaiting approval');
      el.style.color = 'var(--gold)';
    } else if (window._syncLastSubmitError) {
      parts.push('⚠ ' + window._syncLastSubmitError);
      el.style.color = '#ff8a8a';
    } else {
      el.style.color = 'var(--accent)';
    }
    el.textContent = parts.join(' · ') || (typeof t === 'function' ? t('sync_cloud_loading') : 'Cloud…');
  }

  async function refreshCloudLeaderboard() {
    const status = document.getElementById('cloud-sync-status');
    if (status && isSyncEnabled()) {
      status.textContent = typeof t === 'function' ? t('sync_cloud_loading') : 'Updating…';
    }
    const result = await syncFetchLeaderboard();
    if (!result.ok && !result.disabled && status) {
      status.textContent = (typeof t === 'function' ? t('sync_cloud_fail') : 'Cloud error') + ': ' + (result.error || '');
      status.style.color = '#ff8a8a';
    }
    updateCloudLoginUI();
    renderCloudSyncStatus();
    if (typeof renderLeaderboardTable === 'function') {
      renderLeaderboardTable(mergeLeaderboardCodes());
    }
    return result;
  }

  window.isSyncEnabled = isSyncEnabled;
  window.isCloudLoggedIn = isCloudLoggedIn;
  window.loadPlayerPin = loadPlayerPin;
  window.syncLogin = syncLogin;
  window.syncRegister = syncRegister;
  window.syncLogout = syncLogout;
  window.syncSubmitRound = syncSubmitRound;
  window.syncFetchLeaderboard = syncFetchLeaderboard;
  window.wasRoundSubmitted = wasRoundSubmitted;
  window.getSyncCoupons = getSyncCoupons;
  window.mergeLeaderboardCodes = mergeLeaderboardCodes;
  window.canViewOthersPrediction = canViewOthersPrediction;
  window.isMatchBetsViewable = isMatchBetsViewable;
  window.openCloudLoginDialog = openCloudLoginDialog;
  window.openCloudRegisterDialog = openCloudRegisterDialog;
  window.openCloudAuthDialog = openCloudAuthDialog;
  window.closeCloudAuthDialog = closeCloudAuthDialog;
  window.submitCloudAuth = submitCloudAuth;
  window.finishAuthDialog = finishAuthDialog;
  window.setAuthDialogMode = setAuthDialogMode;
  window.requireCloudAuthForSeal = requireCloudAuthForSeal;
  window.updateCloudLoginUI = updateCloudLoginUI;
  window.renderCloudSyncStatus = renderCloudSyncStatus;
  window.refreshCloudLeaderboard = refreshCloudLeaderboard;
  window.getCloudSessionName = getCloudSessionName;
})();
