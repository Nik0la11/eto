"use client";

import { createContext, useContext, useState } from "react";

const ClickContext = createContext();
const DateContext = createContext();
const CalendarContext = createContext();
const FreeAppointmentsContext = createContext();

export const ClickProvider = ({ children }) => {
  const [isClicked, setIsClicked] = useState(true);
  const [date, setDate] = useState(true);
  const [calendar, setCalendar] = useState(true);
  const [freeAppointments, setFreeAppointments] = useState(true);

  return (
    <ClickContext.Provider value={{ isClicked, setIsClicked }}>
      <DateContext.Provider value={{ date, setDate }}>
        <CalendarContext.Provider value={{ calendar, setCalendar }}>
          <FreeAppointmentsContext.Provider
            value={{ freeAppointments, setFreeAppointments }}
          >
            {children}
          </FreeAppointmentsContext.Provider>
        </CalendarContext.Provider>
      </DateContext.Provider>
    </ClickContext.Provider>
  );
};

export const useClick = () => useContext(ClickContext);
export const useDate = () => useContext(DateContext);
export const useCalendar = () => useContext(CalendarContext);
export const useFreeAppointments = () => useContext(FreeAppointmentsContext);
