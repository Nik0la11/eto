"use client";
import HomePage from "../pages/HomePage";
import WorkingHoursPage from "../pages/WorkingHoursPage";
import Services from "../pages/Services";
import Location from "../pages/Location";
import Appointment from "../pages/Appointment";
import App from "next/app";

const Content = () => {
  return (
    <div>
      <HomePage />
      <WorkingHoursPage />
      <Services />
      <Location />
      <Appointment />
    </div>
  );
};

export default Content;
