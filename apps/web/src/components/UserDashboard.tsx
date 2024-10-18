"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import io from "socket.io-client";
import { MapPin, Navigation, Truck, Phone, User } from "lucide-react";
import { GetStatusBadge } from "@/lib/ui";

const socket = io("http://localhost:3001");

const BookingCard = ({ booking }: { booking: any }) => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    socket.on(`driverLocation${booking.bookingId}`, location => {
      setLocation(location);
      console.log(`driverLocation${booking.bookingId}`, location);
    });
    return () => {
      socket.off(`driverLocation${booking.bookingId}`);
    };
  }, [booking.bookingId]);

  return (
    <Card className="mb-4 overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="bg-[#4ECDC4] text-[#1A3A3A]">
        <CardTitle className="flex justify-between items-center">
          <span>Booking #{booking.bookingId}</span>
          <GetStatusBadge status={booking.status} />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">From</p>
            <p className="font-semibold flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-[#4ECDC4]" />(
              {booking.pickupLat}, {booking.pickupLng})
            </p>
          </div>
          <Truck className="h-6 w-6 text-[#4ECDC4]" />
          <div>
            <p className="text-sm text-gray-500">To</p>
            <p className="font-semibold flex items-center">
              <Navigation className="h-4 w-4 mr-1 text-[#4ECDC4]" />(
              {booking.dropLat}, {booking.dropLng})
            </p>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <p>
            <strong>Distance:</strong> {booking.distance} km
          </p>
          <p>
            <strong>Price:</strong> ₹{booking.price}
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] bg-white">
            <DialogHeader className="bg-[#4ECDC4] text-[#1A3A3A] p-6 -mx-6 -mt-6 rounded-t-lg">
              <DialogTitle className="text-2xl font-bold">
                Booking Details
              </DialogTitle>
              <DialogDescription className="text-[#1A3A3A] opacity-80">
                Detailed information about booking #{booking.bookingId}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 space-y-6">
              {booking.status?.toLowerCase() === "pending" ||
              booking.status?.toLowerCase() === "confirmed" ? (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
                  <p className="font-medium">Driver's location unavailable</p>
                  <p className="text-sm">
                    The real-time location of the driver will be viewable once
                    they start the journey.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label
                    htmlFor="pickupLocation"
                    className="text-[#1A3A3A] font-semibold"
                  >
                    Driver's Current Location
                  </Label>
                  <div className="rounded-md overflow-hidden border border-gray-200">
                    <MapContainer
                      center={[
                        location?.latitude ?? 0,
                        location?.longitude ?? 0,
                      ]}
                      zoom={16}
                      style={{ height: "300px", width: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker
                        position={[
                          location?.latitude ?? 0,
                          location?.longitude ?? 0,
                        ]}
                      />
                    </MapContainer>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#1A3A3A] font-semibold">
                    Pickup Location
                  </Label>
                  <div className="flex items-center bg-gray-100 p-2 rounded-md">
                    <MapPin className="text-[#4ECDC4] mr-2" />
                    <span>
                      ({booking.pickupLat}, {booking.pickupLng})
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1A3A3A] font-semibold">
                    Drop-off Location
                  </Label>
                  <div className="flex items-center bg-gray-100 p-2 rounded-md">
                    <Navigation className="text-[#4ECDC4] mr-2" />
                    <span>
                      ({booking.dropLat}, {booking.dropLng})
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1A3A3A] font-semibold">
                    Distance
                  </Label>
                  <div className="flex items-center bg-gray-100 p-2 rounded-md">
                    <Truck className="text-[#4ECDC4] mr-2" />
                    <span>{booking.distance} km</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1A3A3A] font-semibold">Price</Label>
                  <div className="flex items-center bg-gray-100 p-2 rounded-md">
                    <span className="text-[#4ECDC4] mr-2 font-bold">₹</span>
                    <span>{booking.price}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#1A3A3A] font-semibold">Status</Label>
                <div>
                  <GetStatusBadge status={booking.status} />
                </div>
              </div>

              {booking.driver ? (
                <div className="bg-gray-100 p-4 rounded-md space-y-2">
                  <Label className="text-[#1A3A3A] font-semibold">
                    Driver Information
                  </Label>
                  <div className="flex items-center">
                    <User className="text-[#4ECDC4] mr-2" />
                    <span>{booking.driver.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="text-[#4ECDC4] mr-2" />
                    <span>{booking.driver.phoneNumber}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 p-4 rounded-md">
                  <Label className="text-[#1A3A3A] font-semibold">Driver</Label>
                  <p>Not assigned yet</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

const BookingList = ({ bookingList }: { bookingList: any[] }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-[#1A3A3A] mb-6">Your Bookings</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookingList?.map((booking: any) => (
          <BookingCard key={booking.bookingId} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default BookingList;
