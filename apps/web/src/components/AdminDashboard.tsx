"use client";

import React, { useState } from "react";
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
import { MapPin, Navigation, Truck, Phone, User, Mail } from "lucide-react";
import { GetStatusBadge } from "@/lib/ui";

const AdminDashboard = ({ bookings }: { bookings: any[] }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map(booking => (
            <Card
              key={booking.bookingId}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
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
                    <Button
                      variant="outline"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px] bg-white">
                    <DialogHeader className="bg-[#4ECDC4] text-[#1A3A3A] p-6 -mx-6 -mt-6 rounded-t-lg">
                      <DialogTitle className="text-2xl font-bold">
                        Booking Details
                      </DialogTitle>
                      <DialogDescription className="text-[#1A3A3A] opacity-80">
                        Detailed information about booking #
                        {selectedBooking?.bookingId}
                      </DialogDescription>
                    </DialogHeader>
                    {selectedBooking && (
                      <div className="mt-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-[#1A3A3A]">
                              User Information
                            </h3>
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-[#4ECDC4]" />
                              <span>{selectedBooking.user.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-[#4ECDC4]" />
                              <span>{selectedBooking.user.phoneNumber}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-[#4ECDC4]" />
                              <span>{selectedBooking.user.email}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-[#1A3A3A]">
                              Driver Information
                            </h3>
                            {selectedBooking.driver ? (
                              <>
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4 text-[#4ECDC4]" />
                                  <span>{selectedBooking.driver.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Phone className="h-4 w-4 text-[#4ECDC4]" />
                                  <span>
                                    {selectedBooking.driver.phoneNumber}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <p className="text-gray-500">
                                No driver assigned yet
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-[#1A3A3A]">
                            Booking Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-[#4ECDC4]" />
                              <span>
                                From: ({selectedBooking.pickupLat},{" "}
                                {selectedBooking.pickupLng})
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Navigation className="h-4 w-4 text-[#4ECDC4]" />
                              <span>
                                To: ({selectedBooking.dropLat},{" "}
                                {selectedBooking.dropLng})
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Truck className="h-4 w-4 text-[#4ECDC4]" />
                              <span>
                                Distance: {selectedBooking.distance} km
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-[#4ECDC4]">
                                ₹
                              </span>
                              <span>Price: {selectedBooking.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-[#1A3A3A]">
                            Status
                          </h3>
                          <div>
                            <GetStatusBadge status={booking.status} />
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
