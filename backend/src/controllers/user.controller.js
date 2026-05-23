import { getProfile, updateProfile } from '../services/user.service.js';
import { ok, fail } from '../utils/response.js';

export async function fetchProfile(req, res) {
  try {
    const profile = await getProfile(req.user.id);
    return ok(res, { profile });
  } catch (err) {
    return fail(res, err.message, 500);
  }
}

export async function patchProfile(req, res) {
  try {
    const profile = await updateProfile(req.user.id, req.body);
    return ok(res, { profile });
  } catch (err) {
    return fail(res, err.message, 500);
  }
}
