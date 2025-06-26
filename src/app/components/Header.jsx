"use client";
import StyledListItem from "./StyledListItem";
import RuleBook from "./RuleBook";
import Privacy from "./Privacy";
import MyAppoints from "./MyAppoints";
import { Suspense } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import HomePage from "./HomePage";

const services = [
  { id: "hours", label: "Radno vreme" },
  { id: "gallery", label: "Galerija" },
  { id: "location", label: "Lokacija" },
  { code: "r", label: "Pravilnik" },
  { code: "p", label: "Privatnost" },
  { code: "m", label: "Moji termini" },
];
import Link from "next/link";

import { useState, useEffect } from "react";
import { useToken } from "./Context";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState("lg");

  useEffect(() => {
    const getScreenSize = () => {
      const width = window.innerWidth;
      return width < 768 ? "sm" : "lg";
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

const Header = () => {
  const { token } = useToken();
  const [rules, setRules] = useState(true);
  const [privacy, setPrivacy] = useState(true);
  const [appointment, setAppointment] = useState(true);
  const screenSize = useScreenSize();
  const [list, setList] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const handleRules = () => {
    setRules(false);
  };

  const handlePrivacy = () => {
    setPrivacy(false);
  };

  const handleAppointment = () => {
    setAppointment(false);
  };

  const handleList = () => {
    setList((prev) => !prev);
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return (
    <div>
      {screenSize === "lg" ? (
        <div className="flex justify-center items-center p-8 mb-24 fixed z-50 top-0 left-0 w-full bg-[#E5E4DF] border-b border-gray-300">
          <ul className="flex gap-6">
            {services.map((service, index) =>
              service.code === "m" && !token ? null : service.id ? (
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
      ) : (
        <div>
          <div className="flex items-center p-8 mb-24 fixed z-50 top-0 left-0 w-full bg-[#E5E4DF] border-b border-gray-300">
            <p className="flex-1 text-black">Logo</p>
            <button onClick={handleList}>
              <Bars3Icon className="h-6 w-6 text-black-600 text-black" />
            </button>
          </div>
          {list && (
            <div className="flex flex-col bg-[#FAF9F6] mt-[88px] w-3/4 mx-auto p-4">
              <ul className="gap-6">
                {services.map((service, index) =>
                  service.id ? (
                    <Link href={`#${service.id}`} key={index}>
                      <StyledListItem className="border-b border-gray-300 text-center">
                        {service.label}
                      </StyledListItem>
                    </Link>
                  ) : (
                    <div className="flex flex-col ">
                      <button
                        key={index}
                        className="border-b border-gray-300"
                        onClick={
                          service.code === "r"
                            ? handleRules
                            : service.code === "p"
                              ? handlePrivacy
                              : token
                                ? handleAppointment
                                : () => {}
                        }
                      >
                        <StyledListItem>{service.label}</StyledListItem>
                      </button>
                    </div>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      <RuleBook rules={rules} setRules={setRules} />
      <Privacy privacy={privacy} setPrivacy={setPrivacy} />
      <Suspense>
        <MyAppoints
          appointment={appointment}
          setAppointment={setAppointment}
          fallback={<div>Loading...</div>}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <HomePage
          appointment={appointment}
          setAppointment={setAppointment}
          className="invisible"
        />
      </Suspense>
    </div>
  );
};

export default Header;
