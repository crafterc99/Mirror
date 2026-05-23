/* MIRROROS API client — loaded as a plain script before React */
(function () {
  'use strict';

  const BASE = ''; // same-origin (backend serves frontend)

  /* ── Token helpers ── */
  // Token is also in an httpOnly cookie (backend sets it).
  // We keep a memory copy so React can read it synchronously.
  let _token = null;

  function authHeaders() {
    const h = { 'Content-Type': 'application/json' };
    if (_token) h['Authorization'] = 'Bearer ' + _token;
    return h;
  }

  async function req(method, path, body) {
    const opts = {
      method,
      headers: authHeaders(),
      credentials: 'include', // send httpOnly cookie
    };
    if (body !== undefined) opts.body = JSON.stringify(body);
    const res = await fetch(BASE + path, opts);
    const json = await res.json().catch(() => ({ ok: false, message: 'Server error' }));
    if (!res.ok) {
      const err = new Error(json.message || 'Request failed');
      err.status = res.status;
      err.errors = json.errors || null;
      throw err;
    }
    return json;
  }

  /* ── API surface ── */
  const MirrorAPI = {
    /* Auth */
    async register(email, username, password, fullName) {
      const data = await req('POST', '/api/auth/register', { email, username, password, fullName });
      if (data.token) _token = data.token;
      return data;
    },

    async login(email, password) {
      const data = await req('POST', '/api/auth/login', { email, password });
      if (data.token) _token = data.token;
      return data;
    },

    async logout() {
      await req('POST', '/api/auth/logout').catch(() => {});
      _token = null;
    },

    async me() {
      return req('GET', '/api/auth/me');
    },

    /* User profile */
    async getProfile() {
      return req('GET', '/api/user/profile');
    },

    async updateProfile(patch) {
      return req('PATCH', '/api/user/profile', patch);
    },

    /* Journal */
    async saveJournalEntry(entry) {
      return req('POST', '/api/journal', entry);
    },

    async listJournalEntries(limit, cursor) {
      const params = new URLSearchParams();
      if (limit) params.set('limit', limit);
      if (cursor) params.set('cursor', cursor);
      const qs = params.toString();
      return req('GET', '/api/journal' + (qs ? '?' + qs : ''));
    },

    /* Health */
    async health() {
      return req('GET', '/api/health');
    },

    /* Read stored token (for React state init) */
    getToken() { return _token; },
  };

  window.MirrorAPI = MirrorAPI;
})();
