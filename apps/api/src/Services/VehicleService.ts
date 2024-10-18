import type { Vehicle } from "@prisma/client";
import PrismaClientSingleton from "../PrismaClientSingleton";

export default class VehicleService {
  private client = PrismaClientSingleton.getInstance();

  public async createVehicle(vehicle: Omit<Vehicle, "vehicleId">) {
    return this.client.vehicle.create({
      data: vehicle,
    });
  }

  public async getAllVehicles() {
    return this.client.vehicle.findMany();
  }

  public async getVehicleById(vehicleId: number) {
    return this.client.vehicle.findUnique({
      where: {
        vehicleId,
      },
    });
  }
}
