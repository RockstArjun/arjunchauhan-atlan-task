"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createBooking } from "@/app/Actions/booking-action";
import { MapPin, Calendar as CalendarIcon, Truck } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { getAllVehicles } from "@/app/Actions/vehicle-action";

const vehiclePrices = {
  trucks: 10000,
  trailers: 20000,
  "mini-trucks": 5000,
};

const SearchField = ({ setLocation }: any) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", result => {
      const { x, y } = result.location;
      setLocation({ lat: y, lng: x });
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (value: any) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

export function BookingDialog({ user }: { user: any }) {
  const route = useRouter();
  const [distance, setDistance] = useState(0);
  const [vehicleType, setVehicleType] = useState("");
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [vehicle, setVehicle] = useState([]);
  const [pickupLocation, setPickupLocation] = useState({
    lat: 30.29719,
    lng: 78.05722,
  });
  const [dropoffLocation, setDropoffLocation] = useState({
    lat: 30.29719,
    lng: 78.05722,
  });
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    //   @ts-ignore
    const price = vehicle.find(v => v.vehicleId === parseInt(vehicleType, 10));
    if (pickupLocation.lat && dropoffLocation.lat && vehicleType) {
      const dist = haversine(
        pickupLocation.lat,
        pickupLocation.lng,
        dropoffLocation.lat,
        dropoffLocation.lng
      );
      setDistance(parseFloat(dist.toFixed(2)));
      //   @ts-ignore
      const cost = dist * 10 + price.vehiclePrice;
      setEstimatedCost(parseFloat(cost.toFixed(2)));
    }
  }, [pickupLocation, dropoffLocation, vehicleType]);

  const fetchVehicle = async () => {
    const res = await getAllVehicles();
    setVehicle(res);
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  const onSubmit = async (data: any) => {
    data.pickupLocation = pickupLocation;
    data.dropoffLocation = dropoffLocation;
    data.vehicleType = vehicleType;
    data.distance = distance;
    data.price = estimatedCost;

    await createBooking({
      userId: user.userId,
      pickupLat: pickupLocation.lat,
      pickupLng: pickupLocation.lng,
      dropLat: dropoffLocation.lat,
      dropLng: dropoffLocation.lng,
      distance: parseFloat(`${distance}`),
      price: parseFloat(`${estimatedCost}`),
      status: "PENDING",
      bookingDate: date,
      vehicleId: parseInt(vehicleType, 10),
    });

    setDialogOpen(false);
    reset();
    route.refresh();
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#4ECDC4] text-[#1A3A3A] hover:bg-[#45B7AA]">
          <Truck className="mr-2 h-4 w-4" /> Book a Ride
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-white p-0 overflow-hidden">
        <DialogHeader className="p-6 bg-[#4ECDC4] text-[#1A3A3A]">
          <DialogTitle className="text-2xl font-bold">
            Create a Booking
          </DialogTitle>
          <DialogDescription className="text-[#1A3A3A] opacity-80">
            Fill in the details and select your pickup and drop-off locations.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="pickupLocation"
                className="text-[#1A3A3A] font-semibold"
              >
                Pickup Location
              </Label>
              <div className="rounded-md overflow-hidden border border-gray-200">
                <MapContainer
                  center={[pickupLocation.lat, pickupLocation.lng]}
                  zoom={13}
                  style={{ height: "300px", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {pickupLocation && (
                    <Marker
                      position={[pickupLocation.lat, pickupLocation.lng]}
                    />
                  )}
                  <SearchField setLocation={setPickupLocation} />
                </MapContainer>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dropoffLocation"
                className="text-[#1A3A3A] font-semibold"
              >
                Drop-Off Location
              </Label>
              <div className="rounded-md overflow-hidden border border-gray-200">
                <MapContainer
                  center={[dropoffLocation.lat, dropoffLocation.lng]}
                  zoom={13}
                  style={{ height: "300px", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {dropoffLocation && (
                    <Marker
                      position={[dropoffLocation.lat, dropoffLocation.lng]}
                    />
                  )}
                  <SearchField setLocation={setDropoffLocation} />
                </MapContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="vehicleType"
                className="text-[#1A3A3A] font-semibold"
              >
                Vehicle Type
              </Label>
              <Select onValueChange={value => setVehicleType(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Vehicle Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>Vehicle Types</SelectLabel>
                    {vehicle.map(
                      (
                        vehi: {
                          vehicleId: string;
                          type: string;
                          vehiclePrice: number;
                        },
                        index
                      ) => {
                        return (
                          <SelectItem
                            key={index + 1}
                            value={`${vehi?.vehicleId}`}
                          >
                            {vehi?.type} (₹{vehi?.vehiclePrice})
                          </SelectItem>
                        );
                      }
                    )}

                    {/* <SelectItem value="trucks">Trucks (₹10000)</SelectItem>
                    <SelectItem value="trailers">Trailers (₹20000)</SelectItem>
                    <SelectItem value="mini-trucks">
                      Mini Trucks (₹5000)
                    </SelectItem> */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[#1A3A3A] font-semibold">Distance</Label>
              <div className="flex items-center bg-gray-100 p-2 rounded-md">
                <MapPin className="text-[#4ECDC4] mr-2" />
                <span>{distance} km</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#1A3A3A] font-semibold">
                Estimated Cost
              </Label>
              <div className="flex items-center bg-gray-100 p-2 rounded-md">
                <Truck className="text-[#4ECDC4] mr-2" />
                <span>₹{estimatedCost}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#1A3A3A] font-semibold">
              Schedule for another day?
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date.toDateString() : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#4ECDC4] text-[#1A3A3A] hover:bg-[#45B7AA]"
            >
              Submit Booking
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
