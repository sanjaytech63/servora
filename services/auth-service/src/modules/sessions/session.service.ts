import { redis } from "../../config/redis";

export class SessionService {
  static async createSession(userId: string, role: string) {
    await redis.set(
      `session:${userId}`,
      { userId, role },
      {
        ex: 60 * 60 * 24 * 30,
      },
    );
  }

  static async getSession(userId: string) {
    return redis.get(`session:${userId}`);
  }

  static async deleteSession(userId: string) {
    await redis.del(`session:${userId}`);
  }
}
