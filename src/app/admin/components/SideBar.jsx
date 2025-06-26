"use client";
import { useCalendar, useWorkingHours } from "./Context";
import { useFreeAppointments } from "./Context";

const SideBar = () => {
  const { calendar, setCalendar } = useCalendar();
  const { freeAppointments, setFreeAppointments } = useFreeAppointments();
  const { workingHours, setWorkingHours } = useWorkingHours();

  // handler for Calendar button
  const handleCalendar = () => {
    setCalendar(true);
    setFreeAppointments(false);
    setWorkingHours(false);
  };

  // handler for FreeAppoints button
  const handleFreeAppoints = () => {
    setFreeAppointments(true);
    setCalendar(false);
    setWorkingHours(false);
  };

  // handler for WorkingHours button
  const handleWorkingHours = () => {
    setWorkingHours(true);
    setFreeAppointments(false);
    setCalendar(false);
  };

  return (
    <div className="bg-[#1F1F1F] w-1/5 px-4 py-8 h-[673px] ">
      <ul className="space-y-4">
        <li className="text-[#F5F5F5]">
          <button onClick={handleFreeAppoints}>
            Dodavanje slobodnih termina
          </button>
        </li>
        <li className="text-[#F5F5F5]">
          <button onClick={handleCalendar}>Kalendar</button>
        </li>
        <li className="text-[#F5F5F5]">
          <button onClick={handleWorkingHours}>Podešavanje radnih dana</button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
