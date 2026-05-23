import prisma from '../config/db.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';

export async function registerUser({ email, username, password, fullName }) {
  const [byEmail, byUsername] = await Promise.all([
    prisma.user.findUnique({ where: { email: email.toLowerCase() } }),
    prisma.user.findUnique({ where: { username: username.toLowerCase() } }),
  ]);

  if (byEmail) throw Object.assign(new Error('Email already registered'), { status: 409 });
  if (byUsername) throw Object.assign(new Error('Username already taken'), { status: 409 });

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      passwordHash,
      fullName: fullName || null,
      profile: { create: {} },
    },
    include: { profile: true },
  });

  const token = signToken({ userId: user.id });
  return { user, token };
}

export async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    include: { profile: true },
  });

  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  const token = signToken({ userId: user.id });
  return { user, token };
}
