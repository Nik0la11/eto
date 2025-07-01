"use client";

import { createContext, useContext, useState } from "react";

const ClickContext = createContext();
const DateContext = createContext();
const CalendarContext = createContext();
const FreeAppointmentsContext = createContext();
const ChooseContext = createContext();
const ChosenDaysContext = createContext();
const WorkingHoursContext = createContext();
const SlotIDContext = createContext();
const StatusContext = createContext();

export const ClickProvider = ({ children }) => {
  const [isClicked, setIsClicked] = useState(true);
  const [date, setDate] = useState(true);
  const [calendar, setCalendar] = useState(true);
  const [freeAppointments, setFreeAppointments] = useState(false);
  const [isChooseClicked, setIsChooseClicked] = useState(true);
  const [chosenDays, setChosenDays] = useState([]);
  const [workingHours, setWorkingHours] = useState(false);
  const [slotID, setSlotID] = useState();
  const [status, setStatus] = useState();

  return (
    <ClickContext.Provider value={{ isClicked, setIsClicked }}>
      <DateContext.Provider value={{ date, setDate }}>
        <CalendarContext.Provider value={{ calendar, setCalendar }}>
          <FreeAppointmentsContext.Provider
            value={{ freeAppointments, setFreeAppointments }}
          >
            <ChooseContext.Provider
              value={{ isChooseClicked, setIsChooseClicked }}
            >
              <ChosenDaysContext.Provider value={{ chosenDays, setChosenDays }}>
                <WorkingHoursContext.Provider
                  value={{ workingHours, setWorkingHours }}
                >
                  <SlotIDContext.Provider value={{ slotID, setSlotID }}>
                    <StatusContext.Provider value={{ status, setStatus }}>
                      {children}
                    </StatusContext.Provider>
                  </SlotIDContext.Provider>
                </WorkingHoursContext.Provider>
              </ChosenDaysContext.Provider>
            </ChooseContext.Provider>
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
export const useChoose = () => useContext(ChooseContext);
export const useChosenDays = () => useContext(ChosenDaysContext);
export const useWorkingHours = () => useContext(WorkingHoursContext);
export const useSlotID = () => useContext(SlotIDContext);
export const useStatus = () => useContext(StatusContext);
