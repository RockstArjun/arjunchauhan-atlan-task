"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createVehicle } from "@/app/Actions/vehicle-action";
import { Plus, Truck, Weight, DollarSign, FileText } from "lucide-react";

const AddVehicleDialog = () => {
  const [vehicle, setVehicle] = useState({
    type: "",
    capacity: "",
    vehiclePrice: "",
    licensePlate: "",
  });
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleAddVehicle = async () => {
    console.log(vehicle);
    await createVehicle({
      ...vehicle,
      capacity: parseInt(vehicle.capacity, 10),
      vehiclePrice: parseInt(vehicle.vehiclePrice, 10),
    });
    setDialogOpen(false);
    setVehicle({ type: "", capacity: "", vehiclePrice: "", licensePlate: "" });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#4ECDC4] text-white hover:bg-[#45b8b0]">
          <Plus className="w-4 h-4 mr-2" /> Add Vehicle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader className="bg-[#4ECDC4] text-[#1A3A3A] p-6 -mx-6 -mt-6 rounded-t-lg">
          <DialogTitle className="text-2xl font-bold">
            Add a New Vehicle
          </DialogTitle>
          <DialogDescription className="text-[#1A3A3A] opacity-80">
            Enter the details of the new vehicle below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="type" className="text-[#1A3A3A]">
              Type
            </Label>
            <div className="relative">
              <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4ECDC4]" />
              <Input
                id="type"
                value={vehicle.type}
                onChange={e => setVehicle({ ...vehicle, type: e.target.value })}
                placeholder="Vehicle Type (e.g., Truck, Van)"
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity" className="text-[#1A3A3A]">
              Capacity
            </Label>
            <div className="relative">
              <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4ECDC4]" />
              <Input
                id="capacity"
                value={vehicle.capacity}
                onChange={e =>
                  setVehicle({ ...vehicle, capacity: e.target.value })
                }
                placeholder="Capacity in Tons"
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehiclePrice" className="text-[#1A3A3A]">
              Vehicle Price
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4ECDC4]" />
              <Input
                id="vehiclePrice"
                value={vehicle.vehiclePrice}
                onChange={e =>
                  setVehicle({ ...vehicle, vehiclePrice: e.target.value })
                }
                placeholder="Price per Distance Unit"
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="licensePlate" className="text-[#1A3A3A]">
              License Plate
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4ECDC4]" />
              <Input
                id="licensePlate"
                value={vehicle.licensePlate}
                onChange={e =>
                  setVehicle({ ...vehicle, licensePlate: e.target.value })
                }
                placeholder="License Plate"
                className="pl-10"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleAddVehicle}
            className="bg-[#4ECDC4] text-white hover:bg-[#45b8b0]"
          >
            Add Vehicle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicleDialog;
