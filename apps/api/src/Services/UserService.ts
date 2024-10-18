import type { User } from "@prisma/client";
import PrismaClientSingleton from "../PrismaClientSingleton";

export default class UserService {
  private client = PrismaClientSingleton.getInstance();

  public async createUser(user: Omit<User, "userId">) {
    return this.client.user.create({
      data: user,
    });
  }
  public async getUser(userId: number) {
    return this.client.user.findUnique({
      where: {
        userId,
      },
    });
  }
}
