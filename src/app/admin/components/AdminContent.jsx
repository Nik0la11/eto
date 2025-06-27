"use client";
import dynamic from "next/dynamic";
import FreeAppointments from "./FreeAppointments";
const Calendar = dynamic(() => import("./Calendar"), { ssr: false });
import { useCalendar, useWorkingHours } from "./Context";
import { useFreeAppointments } from "./Context";
import WorkingHours from "./WorkingHours";
import { useEffect } from "react";

const AdminContent = () => {
  const { calendar } = useCalendar();
  const { freeAppointments } = useFreeAppointments();
  const { workingHours } = useWorkingHours();

  useEffect(() => {
    // Disable page scroll when component mounts
    document.body.style.overflow = "hidden";

    // Re-enable scroll when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="w-4/5 h-[673px] ">
      {calendar && <Calendar />}
      {freeAppointments && <FreeAppointments />}
      {workingHours && <WorkingHours />}
    </div>
  );
};

export default AdminContent;
