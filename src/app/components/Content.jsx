import HomePage from "./HomePage";
import WorkingHoursPage from "./WorkingHoursPage";
import Services from "./Services";
import Location from "./Location";
import Appointment from "./Appointment";
import { Suspense } from "react";

const Content = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </Suspense>
      <WorkingHoursPage />
      <Services />
      <Location />
      <Suspense fallback={<div>Loading...</div>}>
        <Appointment />
      </Suspense>
    </div>
  );
};

export default Content;
