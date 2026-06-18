/* Cloud leaderboard sync — Google Apps Script */
(function () {
  const PIN_KEY = 'fifa2026pin';
  window._syncPlayers = [];
  window._syncLastFetch = null;
  window._syncLastSubmit = null;
  window._syncPendingApproval = false;
  window._syncLastSubmitError = '';

  function cfg() {
    return window.SYNC_CONFIG || {};
  }

  function isSyncEnabled() {
    const c = cfg();
    return !!(c.enabled && c.url && c.secret);
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

  async function syncFetchLeaderboard() {
    if (!isSyncEnabled()) return { ok: false, disabled: true };
    const c = cfg();
    const url = c.url + (c.url.includes('?') ? '&' : '?') +
      'action=leaderboard&secret=' + encodeURIComponent(c.secret);
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
    const name = typeof getPlayerName === 'function' ? getPlayerName() : '';
    const pin = loadPlayerPin();
    if (!name || !pin) return { ok: false, error: 'no_auth' };

    const c = cfg();
    const body = {
      action: 'submit',
      secret: c.secret,
      name,
      pin,
      coupon,
      roundId,
      roundLabel: typeof roundLabel === 'function' ? roundLabel(roundId) : roundId
    };

    try {
      const res = await fetch(c.url, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'submit failed');
      window._syncLastSubmit = new Date();
      window._syncPendingApproval = !!data.pendingApproval;
      window._syncLastSubmitError = '';
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
    let local = [];
    try {
      const raw = localStorage.getItem('fifa2026leaderboard');
      local = raw ? JSON.parse(raw) : [];
    } catch (e) { /* ignore */ }

    const syncCodes = getSyncCoupons();
    const seen = new Set();
    const out = [];
    syncCodes.forEach(code => {
      if (!seen.has(code)) { seen.add(code); out.push(code); }
    });
    local.forEach(code => {
      if (!seen.has(code)) { seen.add(code); out.push(code); }
    });
    return out;
  }

  function canViewOthersPrediction(matchId) {
    if (typeof getMatchActual === 'function' && getMatchActual(matchId)) return true;
    if (typeof isKickoffLockActive === 'function' && isKickoffLockActive(matchId)) return true;
    return false;
  }

  function isMatchBetsViewable(matchId) {
    return canViewOthersPrediction(matchId);
  }

  function ensurePlayerAuthBeforeSeal() {
    if (typeof ensurePlayerNameBeforeSeal !== 'function') return null;
    const name = ensurePlayerNameBeforeSeal();
    if (!name) return null;

    let pin = loadPlayerPin();
    if (!pin) {
      const p1 = prompt(typeof t === 'function' ? t('prompt_pin') : 'PIN (4–12 chars):');
      if (!p1?.trim()) {
        alert(typeof t === 'function' ? t('alert_no_pin') : 'PIN required');
        return null;
      }
      const p2 = prompt(typeof t === 'function' ? t('prompt_pin_confirm') : 'Confirm PIN:');
      if (p1.trim() !== p2?.trim()) {
        alert(typeof t === 'function' ? t('alert_pin_mismatch') : 'PIN mismatch');
        return null;
      }
      pin = p1.trim();
      savePlayerPin(pin);
    }
    return { name, pin };
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
    renderCloudSyncStatus();
    if (typeof renderLeaderboardTable === 'function') {
      renderLeaderboardTable(mergeLeaderboardCodes());
    }
    return result;
  }

  window.isSyncEnabled = isSyncEnabled;
  window.loadPlayerPin = loadPlayerPin;
  window.savePlayerPin = savePlayerPin;
  window.clearPlayerPin = clearPlayerPin;
  window.syncSubmitRound = syncSubmitRound;
  window.syncFetchLeaderboard = syncFetchLeaderboard;
  window.getSyncCoupons = getSyncCoupons;
  window.mergeLeaderboardCodes = mergeLeaderboardCodes;
  window.canViewOthersPrediction = canViewOthersPrediction;
  window.isMatchBetsViewable = isMatchBetsViewable;
  window.ensurePlayerAuthBeforeSeal = ensurePlayerAuthBeforeSeal;
  window.renderCloudSyncStatus = renderCloudSyncStatus;
  window.refreshCloudLeaderboard = refreshCloudLeaderboard;
})();
