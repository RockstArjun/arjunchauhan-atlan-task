import express, { type Express } from "express";
import { type Action, useExpressServer } from "routing-controllers";
import { createServer } from "http";
import { Server } from "socket.io";
import PrismaClientSingleton from "./PrismaClientSingleton";
import UserController from "./Controllers/UserController";
import BookingController from "./Controllers/BookingController";
import DriverController from "./Controllers/DriverController";
import VehicleController from "./Controllers/VehicleController";

export const createServers = () => {
  const app = useExpressServer(express(), {
    cors: true,
    controllers: [
      UserController,
      BookingController,
      DriverController,
      VehicleController,
    ],
    middlewares: [],
    authorizationChecker: (action: Action) => {
      const request = action.request as express.Request;
      return new Promise<boolean>((resolve, reject) => {
        return resolve(true);
      });
    },
  });

  app.disable("x-powered-by");

  PrismaClientSingleton.initialize();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", socket => {
    console.log("A user connected");

    socket.on("driverLocation", data => {
      const { bookingId, latitude, longitude } = data;
      io.emit(`driverLocation${bookingId}`, { latitude, longitude });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return httpServer;
};
