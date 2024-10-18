import React from "react";
import User from "./user";
import { getUser } from "@/app/Actions/user-action";
import { getBookingByUserId } from "@/app/Actions/booking-action";

async function page({ params }: { params: { userId: string } }) {
  if (!params.userId) {
    return;
  }
  const user = await getUser(parseInt(params.userId, 10));
  const bookingList = await getBookingByUserId(parseInt(params.userId, 10));
  return <User user={user} bookingList={bookingList} />;
}

export default page;
