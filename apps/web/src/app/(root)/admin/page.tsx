import React from "react";
import AdminDashboard from "@/components/AdminDashboard";
import { getAllBooking } from "@/app/Actions/booking-action";
import { UserButton } from "@clerk/nextjs";
import { Truck } from "lucide-react";
import AddVehicleDialog from "@/components/AddVehicle";
import { Button } from "@/components/ui/button";

async function Admin() {
  const allBooking = await getAllBooking();
  return (
    <div className="flex h-screen bg-[#F0F4F8]">
      <aside className="w-64 bg-[#1A3A3A] text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold flex items-center">
            <Truck className="mr-2 h-6 w-6" />
            LogiTech
          </h1>
        </div>
        <nav className="mt-6">
          <button className="flex items-center w-full px-6 py-3 text-left bg-[#4ECDC4] text-[#1A3A3A]">
            Dashboard
          </button>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#1A3A3A]">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <AddVehicleDialog />

              <UserButton />
            </div>
          </nav>
          <AdminDashboard bookings={allBooking} />
        </div>
      </main>
    </div>
  );
}

export default Admin;
