"use client";
import StyledListItem from "./StyledListItem";
import RuleBook from "./RuleBook";
import Privacy from "./Privacy";
import MyAppoints from "./MyAppoints";
import { Suspense } from "react";

const services = [
  { id: "hours", label: "Radno vreme" },
  { id: "gallery", label: "Galerija" },
  { id: "location", label: "Lokacija" },
  { code: "r", label: "Pravilnik" },
  { code: "p", label: "Privatnost" },
  { label: "Moji termini" },
];
import Link from "next/link";

import { useState } from "react";

const Header = () => {
  const [rules, setRules] = useState(true);
  const [privacy, setPrivacy] = useState(true);
  const [appointment, setAppointment] = useState(true);

  const handleRules = () => {
    setRules(false);
  };

  const handlePrivacy = () => {
    setPrivacy(false);
  };

  const handleAppointment = () => {
    setAppointment(false);
  };
  return (
    <div>
      <div className="flex justify-center items-center p-8 mb-24 fixed z-50 top-0 left-0 w-full bg-[#E5E4DF] border-b border-gray-300">
        <ul className="flex gap-6">
          {services.map((service, index) =>
            service.id ? (
              <Link href={`#${service.id}`} key={index}>
                <StyledListItem key={index}>{service.label}</StyledListItem>
              </Link>
            ) : (
              <button
                key={index}
                onClick={
                  service.code === "r"
                    ? handleRules
                    : service.code === "p"
                      ? handlePrivacy
                      : handleAppointment
                }
              >
                <StyledListItem>{service.label}</StyledListItem>
              </button>
            )
          )}
        </ul>
      </div>

      <RuleBook rules={rules} setRules={setRules} />
      <Privacy privacy={privacy} setPrivacy={setPrivacy} />
      <Suspense>
        <MyAppoints
          appointment={appointment}
          setAppointment={setAppointment}
          fallback={<div>Loading...</div>}
        />
      </Suspense>
    </div>
  );
};

export default Header;
