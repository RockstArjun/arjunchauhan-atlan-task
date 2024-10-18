import React from "react";
import Driver from "./driver";
import { getBookingByDriverId } from "@/app/Actions/booking-action";
import { getDriver } from "@/app/Actions/driver-action";

async function page({ params }: { params: { driverId: string } }) {
  if (!params.driverId) {
    return;
  }
  const driver = await getDriver(parseInt(params.driverId, 10));
  const bookingList = await getBookingByDriverId(parseInt(params.driverId, 10));
  return <Driver driver={driver} bookingList={bookingList} />;
}

export default page;
