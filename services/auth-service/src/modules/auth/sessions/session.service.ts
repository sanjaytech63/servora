import { redis } from "../../../config/redis";

const SESSION_PREFIX = "session:";

export const createSession = async (userId: string, refreshToken: string) => {
  const key = `${SESSION_PREFIX}${userId}`;

  await redis.set(
    key,
    {
      refreshToken,
      createdAt: Date.now(),
    },
    {
      ex: 60 * 60 * 24 * 7, // 7 days
    },
  );
};

export const getSession = async (userId: string) => {
  return await redis.get(`${SESSION_PREFIX}${userId}`);
};

export const deleteSession = async (userId: string) => {
  await redis.del(`${SESSION_PREFIX}${userId}`);
};
