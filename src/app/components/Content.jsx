import HomePage from "./HomePage";
import WorkingHoursPage from "./WorkingHoursPage";
import Services from "./Services";
import Location from "./Location";
import Appointment from "./Appointment";
import { Suspense } from "react";
import Appointment2 from "./Appointment2";

const Content = () => {
  return (
    <div>
      <WorkingHoursPage />
      <Services />
      <Appointment2 />
      <Suspense fallback={<div>Loading...</div>}>
        <Appointment />
      </Suspense>
      <Location />
    </div>
  );
};

export default Content;
