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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import io from "socket.io-client";
import { MapPin, Navigation, Truck, Phone, User } from "lucide-react";
import { updateBooking } from "@/app/Actions/booking-action";
import { useRouter } from "next/navigation";
import { GetStatusBadge } from "@/lib/ui";

const socket = io("http://localhost:3001");

const BookingCard = ({ booking, driver }: { booking: any; driver: any }) => {
  const router = useRouter();
  const [status, setStatus] = useState(booking.status);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="destructive">Pending</Badge>;
      case "CONFIRMED":
        return <Badge variant="secondary">Confirmed</Badge>;
      case "IN_PROGRESS":
        return <Badge variant="outline">In Progress</Badge>;
      case "COMPLETED":
        return <Badge variant="secondary">Completed</Badge>;
      case "CANCELED":
        return <Badge variant="destructive">Canceled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const startLocationSharing = (bookingId: number) => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          socket.emit("driverLocation", { bookingId, latitude, longitude });
          console.log("driverLocation", { bookingId, latitude, longitude });
        },
        error => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    startLocationSharing(booking.bookingId);
  }, [booking.bookingId]);

  const acceptBooking = async (bookingId: number) => {
    await updateBooking(bookingId, {
      status: "CONFIRMED",
      driverId: driver.driverId,
    });
    setStatus("CONFIRMED");
    router.refresh();
  };

  const rejectBooking = async (bookingId: number) => {
    await updateBooking(bookingId, {
      status: "CANCELED",
      driverId: driver.driverId,
    });
    setStatus("CANCELED");
    router.refresh();
  };

  const updateStatus = async (bookingId: number, newStatus: string) => {
    await updateBooking(bookingId, {
      status: newStatus,
      driverId: driver.driverId,
    });
    setStatus(newStatus);
    router.refresh();
  };

  return (
    <Card className="mb-4 overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="bg-[#4ECDC4] text-[#1A3A3A]">
        <CardTitle className="flex justify-between items-center">
          <span>Booking #{booking.bookingId}</span>
          {getStatusBadge(booking.status)}
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
      <CardFooter className="bg-gray-50 flex justify-between">
        {booking.driverId === null ? (
          <div className="flex space-x-2">
            <Button
              variant="default"
              onClick={() => acceptBooking(booking.bookingId)}
            >
              Accept
            </Button>
            <Button
              variant="destructive"
              onClick={() => rejectBooking(booking.bookingId)}
            >
              Reject
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 items-center w-full">
            <Select value={status} onValueChange={value => setStatus(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Update status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELED">Canceled</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => updateStatus(booking.bookingId, status)}>
              Update Status
            </Button>
            <BookingDetailsDialog booking={booking} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

const BookingDetailsDialog = ({ booking }: { booking: any }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
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
          <div className="space-y-2">
            <Label
              htmlFor="pickupLocation"
              className="text-[#1A3A3A] font-semibold"
            >
              Pickup Location
            </Label>
            <div className="rounded-md overflow-hidden border border-gray-200">
              <MapContainer
                center={[booking.pickupLat, booking.pickupLng]}
                zoom={15}
                style={{ height: "220px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[booking.pickupLat, booking.pickupLng]} />
              </MapContainer>
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="dropLocation"
              className="text-[#1A3A3A] font-semibold"
            >
              Drop-off Location
            </Label>
            <div className="rounded-md overflow-hidden border border-gray-200">
              <MapContainer
                center={[booking.dropLat, booking.dropLng]}
                zoom={15}
                style={{ height: "220px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[booking.dropLat, booking.dropLng]} />
              </MapContainer>
            </div>
          </div>
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
              <Label className="text-[#1A3A3A] font-semibold">Distance</Label>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function DriverDashboard({
  bookingList,
  driver,
}: {
  bookingList: any[];
  driver: any;
}) {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-[#1A3A3A] mb-6">
        Your Assigned Bookings
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookingList?.map((booking: any) => (
          <BookingCard
            key={booking.bookingId}
            booking={booking}
            driver={driver}
          />
        ))}
      </div>
    </div>
  );
}
