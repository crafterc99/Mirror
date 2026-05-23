export function ok(res, data, status = 200) {
  return res.status(status).json({ ok: true, ...data });
}

export function fail(res, message, status = 400, errors = null) {
  const body = { ok: false, message };
  if (errors) body.errors = errors;
  return res.status(status).json(body);
}

export function safeUser(user) {
  const { passwordHash, ...safe } = user;
  return safe;
}
