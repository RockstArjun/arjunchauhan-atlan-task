import {
  Authorized,
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import DriverService from "../Services/DriverService";
import type { Driver } from "@prisma/client";

@JsonController("/api/driver")
@Authorized()
export default class DriverController {
  private driverService: DriverService;

  constructor() {
    this.driverService = new DriverService();
  }

  @Get("/:id")
  public async getDriver(@Param("id") id: string) {
    const driverId = parseInt(id, 10);
    return this.driverService.getDriver(driverId);
  }

  @Post()
  public async createDriver(@Body() body: Omit<Driver, "driverId">) {
    return this.driverService.createDriver(body);
  }

  @Put("/:id")
  public async updateDriver(
    @Param("id") id: string,
    @Body() data: Partial<Driver>
  ) {
    const driverId = parseInt(id, 10);
    return this.driverService.updateDriver(driverId, data);
  }

  @Delete("/:id")
  public async deleteDriver(@Param("id") id: string) {
    const driverId = parseInt(id, 10);
    return this.driverService.deleteDriver(driverId);
  }
}
