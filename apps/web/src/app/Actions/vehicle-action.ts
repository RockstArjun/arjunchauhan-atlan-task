"use server";
import axios from "axios";

export const getAllVehicles = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/vehicle`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw new Error("Failed to fetch vehicles. Please try again later.");
  }
};

export const getVehicleById = async (vehicleId: number) => {
  if (!vehicleId) throw new Error("Vehicle ID is required");

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/vehicle/${vehicleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    throw new Error("Failed to fetch vehicle. Please try again later.");
  }
};

export const createVehicle = async (vehicle: {
  type: string;
  capacity: number;
  vehiclePrice: number;
  licensePlate: string;
}) => {
  if (
    !vehicle.type ||
    !vehicle.capacity ||
    !vehicle.vehiclePrice ||
    !vehicle.licensePlate
  ) {
    throw new Error(
      "All vehicle fields (type, capacity, price, license plate) are required."
    );
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/vehicle`,
      vehicle
    );
    return response.data;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw new Error(
      "Failed to create vehicle. Please check your input and try again."
    );
  }
};
