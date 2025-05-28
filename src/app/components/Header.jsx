"use client";
import StyledListItem from "./StyledListItem";
const services = [
  { id: "hours", label: "Radno vreme" },
  { id: "gallery", label: "Galerija" },
  { id: "location", label: "Lokacija" },
  { code: "r", label: "Pravilnik" },
  { code: "p", label: "Privatnost" },
  { label: "Moji termini" },
];
import Link from "next/link";
import Button from "./Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Header = () => {
  const [rules, setRules] = useState(true);
  const [privacy, setPrivacy] = useState(true);
  const [appointment, setAppointment] = useState(true);

  const handleRules = () => {
    setRules(true);
  };

  const handleRules1 = () => {
    setRules(false);
  };

  const handlePrivacy = () => {
    setPrivacy(true);
  };

  const handlePrivacy1 = () => {
    setPrivacy(false);
  };

  const handleAppointment = () => {
    setAppointment(true);
  };

  const handleAppointment1 = () => {
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
                    ? handleRules1
                    : service.code === "p"
                      ? handlePrivacy1
                      : handleAppointment1
                }
              >
                <StyledListItem>{service.label}</StyledListItem>
              </button>
            )
          )}
        </ul>
      </div>

      {/*--------------------------------------------------- PRAVILNIK ---------------------------------------------------*/}

      <div
        className={`fixed top-0 left-0 flex justify-center items-center z-[9999] h-screen bg-[#00000080] w-full ${rules ? "invisible" : "visible"}`}
      >
        <div className=" bg-[#FAF9F6] w-1/2 p-4">
          <div className="flex my-2">
            <h1 className="uppercase font-bold text-[#D4AF37] text-3xl flex-1">
              Pravilnik
            </h1>
            <XMarkIcon
              className="h-6 w-6 cursor-pointer text-black-600  hover:text-black-900"
              onClick={handleRules}
            />
          </div>
          <div className="my-2">Ovdje idu ta pravila i sve to</div>
          <div className="flex justify-end ">
            {" "}
            <Button onClick={handleRules} className="place-self-end">
              Zatvori
            </Button>
          </div>
        </div>
      </div>

      {/*--------------------------------------------------- PRIVATNOST ---------------------------------------------------*/}

      <div
        className={`fixed top-0 left-0 flex justify-center items-center z-[9999] h-screen bg-[#00000080] w-full ${privacy ? "invisible" : "visible"}`}
      >
        <div className=" bg-[#FAF9F6] w-1/2 p-4">
          <div className="flex my-2">
            <h1 className="uppercase font-bold text-[#D4AF37] text-3xl flex-1">
              Politika privatnosti
            </h1>
            <XMarkIcon
              className="h-6 w-6 cursor-pointer text-black-600  hover:text-black-900"
              onClick={handlePrivacy}
            />
          </div>
          <div className="my-2">Ovdje idu ta pravila i sve to</div>
          <div className="flex justify-end ">
            {" "}
            <Button onClick={handlePrivacy} className="place-self-end">
              Zatvori
            </Button>
          </div>
        </div>
      </div>

      {/*--------------------------------------------------- TERMINI ---------------------------------------------------*/}

      <div
        className={`fixed top-0 left-0 flex justify-center items-center z-[9999] h-screen bg-[#00000080] w-full ${appointment ? "invisible" : "visible"}`}
      >
        <div className=" bg-[#FAF9F6] w-1/2 p-4">
          <div className="mb-4">
            <div className="flex ">
              <h1 className="uppercase font-bold text-[#D4AF37] text-3xl flex-1">
                Lista termina
              </h1>
              <XMarkIcon
                className="h-6 w-6 cursor-pointer text-black-600  hover:text-black-900"
                onClick={handleAppointment}
              />
            </div>

            <div className="my-2">
              <p className="text-red-900 mb-4">
                Napomena: Termin možete otkazati do 2h pred termin putem email
                poruke koju ste primili ili telefonskim pozivom!
              </p>

              <div className="flex justify-center items-center gap-2 w-full">
                <div className="h-12 grow bg-[#E5E4DF] flex justify-center items-center ">
                  <p className="font-['Montserrat'] font-semibold">#</p>
                </div>
                <div className="h-12 grow bg-[#E5E4DF]  flex justify-center items-center ">
                  <p className="font-['Montserrat'] font-semibold">Datum</p>
                </div>
                <div className="h-12 grow bg-[#E5E4DF]  flex justify-center items-center">
                  <p className="font-['Montserrat'] font-semibold">Vreme</p>
                </div>
                <div className="h-12 grow bg-[#E5E4DF]  flex justify-center items-center ">
                  <p className="font-['Montserrat'] font-semibold">Status</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-8 mb-4">
              <div className="flex mb-2">
                <h1 className="uppercase font-bold text-[#D4AF37] text-3xl flex-1">
                  Lista otkazanih termina
                </h1>
              </div>

              <div className="mb-2">
                <div className="flex justify-center items-center gap-2 w-full">
                  <div className="h-12 grow bg-[#E5E4DF] flex justify-center items-center ">
                    <p className="font-['Montserrat'] font-semibold">#</p>
                  </div>
                  <div className="h-12 grow bg-[#E5E4DF]  flex justify-center items-center ">
                    <p className="font-['Montserrat'] font-semibold">Datum</p>
                  </div>
                  <div className="h-12 grow bg-[#E5E4DF]  flex justify-center items-center">
                    <p className="font-['Montserrat'] font-semibold">Vreme</p>
                  </div>
                  <div className="h-12 grow bg-[#E5E4DF]  flex justify-center items-center ">
                    <p className="font-['Montserrat'] font-semibold">Status</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-2"></div>
          </div>
          <div className="flex justify-end ">
            {" "}
            <Button onClick={handleAppointment} className="place-self-end">
              Zatvori
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
