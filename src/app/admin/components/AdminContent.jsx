"use client";
import dynamic from "next/dynamic";
import FreeAppointments from "./FreeAppointments";
const Calendar = dynamic(() => import("./Calendar"), { ssr: false });
import { useCalendar, useWorkingHours } from "./Context";
import { useFreeAppointments } from "./Context";
import WorkingHours from "./WorkingHours";

const AdminContent = () => {
  const { calendar } = useCalendar();
  const { freeAppointments } = useFreeAppointments();
  const { workingHours } = useWorkingHours();

  return (
    <div className="w-4/5 h-[673px] ">
      {calendar && <Calendar />}
      {freeAppointments && <FreeAppointments />}
      {workingHours && <WorkingHours />}
    </div>
  );
};

export default AdminContent;
