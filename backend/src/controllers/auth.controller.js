import { registerUser, loginUser } from '../services/auth.service.js';
import { ok, fail, safeUser } from '../utils/response.js';
import { COOKIE_OPTIONS } from '../utils/jwt.js';

export async function register(req, res) {
  try {
    const { email, username, password, fullName } = req.body;
    const { user, token } = await registerUser({ email, username, password, fullName });
    res.cookie('mirror_token', token, COOKIE_OPTIONS);
    return ok(res, { user: safeUser(user), token }, 201);
  } catch (err) {
    return fail(res, err.message, err.status || 500);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });
    res.cookie('mirror_token', token, COOKIE_OPTIONS);
    return ok(res, { user: safeUser(user), token });
  } catch (err) {
    return fail(res, err.message, err.status || 500);
  }
}

export function logout(req, res) {
  res.clearCookie('mirror_token', { path: '/' });
  return ok(res, { message: 'Logged out' });
}

export function me(req, res) {
  return ok(res, { user: safeUser(req.user) });
}
