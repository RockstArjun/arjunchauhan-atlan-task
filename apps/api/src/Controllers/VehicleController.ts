import {
  Authorized,
  Body,
  Get,
  JsonController,
  Param,
  Post,
} from "routing-controllers";
import VehicleService from "../Services/VehicleService";
import type { Vehicle } from "@prisma/client";

@JsonController("/api/vehicle")
@Authorized()
export default class VehicleController {
  private vehicleService: VehicleService;

  constructor() {
    this.vehicleService = new VehicleService();
  }

  @Get("/:id")
  public async getVehicleById(@Param("id") id: string) {
    const vehicleId = parseInt(id, 10);
    return this.vehicleService.getVehicleById(vehicleId);
  }

  @Get()
  public async getAllVehicles() {
    return this.vehicleService.getAllVehicles();
  }

  @Post()
  public async createVehicle(@Body() body: Omit<Vehicle, "vehicleId">) {
    return this.vehicleService.createVehicle(body);
  }
}
