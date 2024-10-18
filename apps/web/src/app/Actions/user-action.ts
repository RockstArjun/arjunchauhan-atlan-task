"use server";
import axios from "axios";

export const getUser = async (userId: number) => {
  if (!userId) throw new Error("User ID is required");

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_HOST}/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user. Please try again later.");
  }
};

export const createUser = async (user: {
  name: string;
  email: string;
  phoneNumber: string;
}) => {
  if (!user.name || !user.email || !user.phoneNumber) {
    throw new Error("All fields (name, email, phone number) are required.");
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/user`,
      user
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(
      "Failed to create user. Please check your input and try again."
    );
  }
};

export const updateUser = async (
  userId: number,
  updatedUserData: { name?: string; email?: string; phoneNumber?: string }
) => {
  if (!userId) throw new Error("User ID is required");

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_HOST}/user/${userId}`,
      updatedUserData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(
      "Failed to update user. Please check your input and try again."
    );
  }
};

export const deleteUser = async (userId: number) => {
  if (!userId) throw new Error("User ID is required");

  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_HOST}/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user. Please try again later.");
  }
};
