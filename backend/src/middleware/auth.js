import { verifyToken } from '../utils/jwt.js';
import { fail } from '../utils/response.js';
import prisma from '../config/db.js';

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.mirror_token
      || req.headers.authorization?.replace('Bearer ', '');

    if (!token) return fail(res, 'Not authenticated', 401);

    const payload = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { profile: true },
    });

    if (!user) return fail(res, 'User not found', 401);

    req.user = user;
    next();
  } catch {
    return fail(res, 'Invalid or expired token', 401);
  }
}
