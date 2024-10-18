"use server";
import axios from "axios";

export const getBooking = async (bookingId: number) => {
  if (!bookingId) throw new Error("Booking ID is required");

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/booking/${bookingId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw new Error("Failed to fetch booking. Please try again later.");
  }
};

export const getAllBooking = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/booking`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw new Error("Failed to fetch booking. Please try again later.");
  }
};
export const getBookingByUserId = async (userId: number) => {
  if (!userId) throw new Error("User ID is required");

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/booking/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw new Error("Failed to fetch booking. Please try again later.");
  }
};
export const getBookingByDriverId = async (driverId: number) => {
  if (!driverId) throw new Error("Driver ID is required");

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/booking/driver/${driverId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw new Error("Failed to fetch booking. Please try again later.");
  }
};

export const createBooking = async (booking: {
  userId: number;
  driverId?: number;
  pickupLat: number;
  pickupLng: number;
  dropLat: number;
  dropLng: number;
  distance: number;
  price: number;
  status?: string;
  bookingDate?: Date;
  vehicleId?: number;
}) => {
  if (
    !booking.userId ||
    !booking.pickupLat ||
    !booking.pickupLng ||
    !booking.dropLat ||
    !booking.dropLng
  ) {
    throw new Error("All booking details are required.");
  }

  try {
    console.log("booking", booking);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/booking`,
      booking
    );
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error(
      "Failed to create booking. Please check your input and try again."
    );
  }
};

export const updateBooking = async (
  bookingId: number,
  updatedBookingData: { status?: string; driverId?: number }
) => {
  if (!bookingId) throw new Error("Booking ID is required");

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/booking/${bookingId}`,
      updatedBookingData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw new Error("Failed to update booking. Please try again later.");
  }
};

export const deleteBooking = async (bookingId: number) => {
  if (!bookingId) throw new Error("Booking ID is required");

  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_HOST}/booking/${bookingId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw new Error("Failed to delete booking. Please try again later.");
  }
};
