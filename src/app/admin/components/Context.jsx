"use client";

import { createContext, useContext, useState } from "react";

const ClickContext = createContext();
const DateContext = createContext();

export const ClickProvider = ({ children }) => {
  const [isClicked, setIsClicked] = useState(true);
  const [date, setDate] = useState(true);
  return (
    <ClickContext.Provider value={{ isClicked, setIsClicked }}>
      <DateContext.Provider value={{ date, setDate }}>
        {children}
      </DateContext.Provider>
    </ClickContext.Provider>
  );
};

export const useClick = () => useContext(ClickContext);
export const useDate = () => useContext(DateContext);
