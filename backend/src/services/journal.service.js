import prisma from '../config/db.js';

export async function createEntry(userId, data) {
  return prisma.journalEntry.create({
    data: {
      userId,
      type: data.type || 'text',
      content: data.content || null,
      transcript: data.transcript || null,
      moodTags: data.moodTags || [],
      emotionalIntensity: data.emotionalIntensity ?? null,
    },
  });
}

export async function listEntries(userId, { limit = 20, cursor } = {}) {
  return prisma.journalEntry.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: {
      id: true, type: true, content: true, moodTags: true,
      emotionalIntensity: true, createdAt: true,
    },
  });
}

export async function getEntry(userId, id) {
  const entry = await prisma.journalEntry.findUnique({ where: { id } });
  if (!entry || entry.userId !== userId) return null;
  return entry;
}
