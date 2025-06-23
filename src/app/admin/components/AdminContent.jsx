"use client";
import dynamic from "next/dynamic";
import FreeAppointments from "./FreeAppointments";
const Calendar = dynamic(() => import("./Calendar"), { ssr: false });
import { useCalendar } from "./Context";
import { useFreeAppointments } from "./Context";

const AdminContent = () => {
  const { calendar, setCalendar } = useCalendar();
  const { freeAppointments, setFreeAppointments } = useFreeAppointments();

  return (
    <div className="w-4/5 h-[673px] ">
      {calendar && <Calendar />}
      {freeAppointments && <FreeAppointments />}
    </div>
  );
};

export default AdminContent;
