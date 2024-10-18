"use server";
import axios from "axios";

export const getDriver = async (driverId: number) => {
  if (!driverId) throw new Error("Driver ID is required");

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/driver/${driverId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching driver:", error);
    throw new Error("Failed to fetch driver. Please try again later.");
  }
};

export const createDriver = async (driver: {
  name: string;
  phoneNumber: string;
  availabilityStatus?: boolean;
}) => {
  if (!driver.name || !driver.phoneNumber) {
    throw new Error("Driver name and phone number are required.");
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/driver`,
      driver
    );
    return response.data;
  } catch (error) {
    console.error("Error creating driver:", error);
    throw new Error(
      "Failed to create driver. Please check your input and try again."
    );
  }
};

export const updateDriver = async (
  driverId: number,
  updatedDriverData: {
    name?: string;
    phoneNumber?: string;
    availabilityStatus?: boolean;
  }
) => {
  if (!driverId) throw new Error("Driver ID is required");

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/driver/${driverId}`,
      updatedDriverData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating driver:", error);
    throw new Error("Failed to update driver. Please try again later.");
  }
};

export const deleteDriver = async (driverId: number) => {
  if (!driverId) throw new Error("Driver ID is required");

  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_HOST}/driver/${driverId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting driver:", error);
    throw new Error("Failed to delete driver. Please try again later.");
  }
};
