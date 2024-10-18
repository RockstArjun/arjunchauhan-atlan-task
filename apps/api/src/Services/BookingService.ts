import type { Booking } from "@prisma/client";
import PrismaClientSingleton from "../PrismaClientSingleton";

export default class BookingService {
  private client = PrismaClientSingleton.getInstance();

  public async createBooking(booking: Omit<Booking, "bookingId">) {
    return this.client.booking.create({
      data: { ...booking },
    });
  }

  public async getBooking(bookingId: number) {
    return this.client.booking.findUnique({
      where: { bookingId },
    });
  }

  public async updateBooking(bookingId: number, data: Partial<Booking>) {
    return this.client.booking.update({
      where: { bookingId },
      data,
    });
  }

  public async deleteBooking(bookingId: number) {
    return this.client.booking.delete({
      where: { bookingId },
    });
  }

  public async getBookingByUserId(userId: number) {
    return this.client.booking.findMany({
      where: { userId },
      include: { driver: true },
    });
  }

  public async getAllBooking() {
    return this.client.booking.findMany({
      include: { driver: true, user: true },
    });
  }

  public async getBookingByDriverId(driverId: number) {
    return this.client.booking.findMany({
      where: {
        OR: [
          { driverId: driverId },
          // @ts-ignore
          { driverId: null },
        ],
      },
      include: { user: true },
    });
  }
}
