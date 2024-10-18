import { PrismaClient } from "@prisma/client";

export default class PrismaClientSingleton {
  private static client: PrismaClient;

  static initialize() {
    if (!this.client) {
      this.client = new PrismaClient({
        datasources: {
          db: {
            url: process.env.DATABASE_URL,
          },
        },
      });
    }
  }

  static getInstance() {
    if (!this.client) {
      PrismaClientSingleton.initialize();
    }
    return this.client;
  }
}
