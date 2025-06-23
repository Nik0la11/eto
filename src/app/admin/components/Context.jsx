"use client";

import { createContext, useContext, useState } from "react";

const ClickContext = createContext();

export const ClickProvider = ({ children }) => {
  const [isClicked, setIsClicked] = useState(true);
  return (
    <ClickContext.Provider value={{ isClicked, setIsClicked }}>
      {children}
    </ClickContext.Provider>
  );
};

export const useClick = () => useContext(ClickContext);
