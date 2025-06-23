"use client";
import { useCalendar } from "./Context";
import { useFreeAppointments } from "./Context";

const SideBar = () => {
  const { calendar, setCalendar } = useCalendar();
  const { freeAppointments, setFreeAppointments } = useFreeAppointments();

  const handleCalendar = () => {
    setCalendar(false);
    setFreeAppointments(true);
  };

  const handleFreeAppoints = () => {
    setFreeAppointments(false);
    setCalendar(true);
  };
  return (
    <div className="bg-[#1F1F1F] w-1/5 px-4 py-8 h-[673px] ">
      <ul className="space-y-4">
        <li className="text-[#F5F5F5]">
          <button onClick={handleCalendar}>Dodavanje slobodnih termina</button>
        </li>
        <li className="text-[#F5F5F5]">
          <button onClick={handleFreeAppoints}>Kalendar</button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
