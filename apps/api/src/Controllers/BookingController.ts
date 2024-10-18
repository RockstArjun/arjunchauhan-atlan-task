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
import BookingService from "../Services/BookingService";
import type { Booking } from "@prisma/client";

@JsonController("/api/booking")
@Authorized()
export default class BookingController {
  private bookingService: BookingService;

  constructor() {
    this.bookingService = new BookingService();
  }

  @Get("/:id")
  public async getBooking(@Param("id") id: string) {
    const bookingId = parseInt(id, 10);
    return this.bookingService.getBooking(bookingId);
  }

  @Get()
  public async getAllBooking() {
    return this.bookingService.getAllBooking();
  }

  @Get("/user/:id")
  public async getBookingByUserId(@Param("id") id: string) {
    const userId = parseInt(id, 10);
    return this.bookingService.getBookingByUserId(userId);
  }

  @Get("/driver/:id")
  public async getBookingByDriverId(@Param("id") id: string) {
    const driverId = parseInt(id, 10);
    return this.bookingService.getBookingByDriverId(driverId);
  }

  @Post()
  public async createBooking(@Body() body: Omit<Booking, "bookingId">) {
    return this.bookingService.createBooking(body);
  }

  @Put("/:id")
  public async updateBooking(
    @Param("id") id: string,
    @Body() data: Partial<Booking>
  ) {
    const bookingId = parseInt(id, 10);
    return this.bookingService.updateBooking(bookingId, data);
  }

  @Delete("/:id")
  public async deleteBooking(@Param("id") id: string) {
    const bookingId = parseInt(id, 10);
    return this.bookingService.deleteBooking(bookingId);
  }
}
