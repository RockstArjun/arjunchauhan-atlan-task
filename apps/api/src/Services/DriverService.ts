import type { Driver } from "@prisma/client";
import PrismaClientSingleton from "../PrismaClientSingleton";

export default class DriverService {
  private client = PrismaClientSingleton.getInstance();

  public async createDriver(driver: Omit<Driver, "driverId">) {
    return this.client.driver.create({
      data: driver,
    });
  }

  public async getDriver(driverId: number) {
    return this.client.driver.findUnique({
      where: {
        driverId,
      },
    });
  }

  public async updateDriver(driverId: number, data: Partial<Driver>) {
    return this.client.driver.update({
      where: { driverId },
      data,
    });
  }

  public async deleteDriver(driverId: number) {
    return this.client.driver.delete({
      where: { driverId },
    });
  }
}
