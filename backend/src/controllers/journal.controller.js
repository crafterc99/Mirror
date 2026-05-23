import { createEntry, listEntries, getEntry } from '../services/journal.service.js';
import { ok, fail } from '../utils/response.js';

export async function create(req, res) {
  try {
    const entry = await createEntry(req.user.id, req.body);
    return ok(res, { entry }, 201);
  } catch (err) {
    return fail(res, err.message, 500);
  }
}

export async function list(req, res) {
  try {
    const { limit, cursor } = req.query;
    const entries = await listEntries(req.user.id, {
      limit: limit ? Number(limit) : 20,
      cursor: cursor || undefined,
    });
    return ok(res, { entries });
  } catch (err) {
    return fail(res, err.message, 500);
  }
}

export async function getOne(req, res) {
  try {
    const entry = await getEntry(req.user.id, req.params.id);
    if (!entry) return fail(res, 'Entry not found', 404);
    return ok(res, { entry });
  } catch (err) {
    return fail(res, err.message, 500);
  }
}
