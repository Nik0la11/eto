"use client";
import { useCalendar, useWorkingHours } from "./Context";
import { useFreeAppointments } from "./Context";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
const SideBar = () => {
  const { setCalendar } = useCalendar();
  const { setFreeAppointments } = useFreeAppointments();
  const { setWorkingHours } = useWorkingHours();
  const [openDropDown, setOpenDropDown] = useState(false);

  const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState("lg");

    useEffect(() => {
      const getScreenSize = () => {
        const width = window.innerWidth;
        return width < 1024 ? "sm" : "lg";
      };

      setScreenSize(getScreenSize());

      const handleResize = () => {
        setScreenSize(getScreenSize());
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return screenSize;
  };

  const ScreenSize = useScreenSize();

  // handler for Calendar button
  const handleCalendar = () => {
    setCalendar(true);
    setFreeAppointments(false);
    setWorkingHours(false);
    setOpenDropDown(false);
  };

  // handler for FreeAppoints button
  const handleFreeAppoints = () => {
    setFreeAppointments(true);
    setCalendar(false);
    setWorkingHours(false);
    setOpenDropDown(false);
  };

  // handler for WorkingHours button
  const handleWorkingHours = () => {
    setWorkingHours(true);
    setFreeAppointments(false);
    setCalendar(false);
    setOpenDropDown(false);
  };

  const handelDropdDown = () => {
    setOpenDropDown((prev) => !prev);
  };

  return ScreenSize === "lg" ? (
    <div className="relative bg-[#1F1F1F] w-1/5 px-4 py-8 h-[673px] ">
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
  ) : (
    <div className="relative bg-[#1F1F1F] w-1/5 px-4 py-8 h-[673px] ">
      <div className=" flex justify-center items-center">
        <button onClick={handelDropdDown}>
          <Bars3Icon className="h-6 w-6 text-black-600 text-[#F5F5F5]" />
        </button>
      </div>
      {openDropDown && (
        <div className="absolute left-10 top-14 w-64 bg-white border shadow rounded z-10 bg-[#2C2C2C] p-2">
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
              <button onClick={handleWorkingHours}>
                Podešavanje radnih dana
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideBar;
