import prisma from '../config/db.js';

export async function getProfile(userId) {
  return prisma.userProfile.findUnique({ where: { userId } });
}

export async function updateProfile(userId, data) {
  const allowed = [
    'primaryGoals', 'emotionalState', 'seekingValues', 'weightValues',
    'beliefOrientation', 'onboardingCompleted', 'bondStage',
  ];
  const patch = Object.fromEntries(
    Object.entries(data).filter(([k]) => allowed.includes(k))
  );
  return prisma.userProfile.update({
    where: { userId },
    data: patch,
  });
}
