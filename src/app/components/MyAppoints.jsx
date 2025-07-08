"use client";
import Button from "./Button";
import { XMarkIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import React from "react";
import { useToken } from "./Context";

const MyAppoints = ({ appointment, setAppointment }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const { token } = useToken();
  const [data, setData] = useState(null);
  const [openDropDownID, setOpenDropDownID] = useState(null);
  const worker_id = 20;
  const handleAppointment = () => {
    setAppointment(true);
  };

  const router = useRouter();

  const handleSignIn = () => {
    router.push("/signIn");
  };

  useEffect(() => {
    if (!token) return;

    fetch(`${BASE_URL}/v1/appointment/my`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.log("Error fetching data:", err));
  }, [token]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/");
    window.location.reload();
  };

  const handleCancelAppointment = () => {
    console.log(openDropDownID);
    fetch(`${BASE_URL}/v1/appointment/cancel_appointment/${openDropDownID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setData((prev) => ({
          ...prev,
          data: prev.data.filter((a) => a.id !== openDropDownID),
        }));

        setOpenDropDownID(null);
      })
      .catch((err) => console.log("Error fetching: ", err));
  };

  function isLessThanTwoHours(appointmentStart) {
    const now = new Date();
    const start = new Date(appointmentStart);
    const diffMs = start - now;

    const twoHoursInMs = 2 * 60 * 60 * 1000;

    return diffMs <= twoHoursInMs;
  }

  return (
    <div
      className={`fixed top-0 left-0 flex justify-center items-center z-[9999] h-screen bg-[#00000080] w-full ${appointment ? "invisible" : "visible"} `}
    >
      <div className=" bg-[#FAF9F6] p-4 sm:w-1/2 sm:min-w-[400px] w-[400px] m-auto">
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
              Napomena: Termin možete otkazati do 2h pred termin putem email!
            </p>

            <div className="grid sm:grid-cols-[1fr_1fr_1fr_1fr_0.295fr] gap-2 mb-2 grid-cols-[1fr_1fr_1fr_1fr_0.5fr]">
              <div className="h-12 grow bg-[#C2C1BA] font-['Montserrat'] font-semibold flex justify-center items-center">
                #
              </div>
              <div className="h-12 grow bg-[#C2C1BA] font-['Montserrat'] font-semibold flex justify-center items-center">
                Datum
              </div>
              <div className="h-12 grow bg-[#C2C1BA] font-['Montserrat'] font-semibold flex justify-center items-center">
                Vreme
              </div>
              <div className="h-12 grow bg-[#C2C1BA] font-['Montserrat'] font-semibold flex justify-center items-center">
                Status
              </div>
            </div>
            <div
              className={`${data?.data?.length > 7 ? "max-h-64 overflow-y-auto grid grid-cols-[1fr_1fr_1fr_1fr_0.2fr] gap-2 relative" : "overflow-visible grid grid-cols-[1fr_1fr_1fr_1fr_0.2fr] gap-2 relative"}`}
            >
              {Array.isArray(data?.data) &&
                [...data.data]
                  .sort(
                    (a, b) => new Date(b.start_time) - new Date(a.start_time)
                  )
                  .map((appointment) => (
                    <React.Fragment key={appointment.id}>
                      <div className="h-12 grow bg-[#E5E4DF] font-['Montserrat'] font-semibold flex justify-center items-center">
                        {appointment.id}
                      </div>
                      <div className="h-12 grow bg-[#E5E4DF] font-['Montserrat'] font-semibold flex justify-center items-center">
                        {new Date(appointment.start_time).toLocaleDateString(
                          "en-CA"
                        )}
                      </div>

                      <div className="h-12 grow bg-[#E5E4DF] font-['Montserrat'] font-semibold flex justify-center items-center">
                        {new Date(appointment.start_time).toLocaleTimeString(
                          "en-GB",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>

                      <div
                        className={`h-12 grow  font-['Montserrat'] font-semibold flex justify-center items-center ${appointment.status === "booked" ? "bg-[#F0DB88]" : "bg-[#E5E4DF]"}`}
                      >
                        {appointment.status}
                      </div>

                      <div className="relative h-12 grow font-['Montserrat'] font-semibold flex justify-center items-center">
                        {isLessThanTwoHours(appointment.start_time) ? null : (
                          <EllipsisVerticalIcon
                            className="h-6 w-6 cursor-pointer text-black-600  hover:text-black-900"
                            onClick={() =>
                              setOpenDropDownID(
                                openDropDownID === appointment.id
                                  ? null
                                  : appointment.id
                              )
                            }
                          />
                        )}

                        {openDropDownID === appointment.id && (
                          <div className="absolute right-0 top-full w-36 bg-white border shadow rounded z-10">
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-p-color"
                              onClick={handleCancelAppointment}
                            >
                              Otkazi termin
                            </button>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  ))}
            </div>

            {token === null ? null : (
              <div className="flex justify-end gap-2 mt-8">
                {token ? (
                  <Button
                    onClick={handleSignOut}
                    className="place-self-end flex gap-2"
                  >
                    <p>Odjavi se</p>
                  </Button>
                ) : (
                  <Button
                    onClick={handleSignIn}
                    className="place-self-end flex gap-2"
                  >
                    <UserIcon className="h-6 w-6 text-black-600" />
                    <p>Prijavi se</p>
                  </Button>
                )}

                <Button onClick={handleAppointment} className="place-self-end">
                  Zatvori
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppoints;
