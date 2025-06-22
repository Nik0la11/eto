"use client";
import Button from "./Button";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import React from "react";

const MyAppoints = ({ appointment, setAppointment }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);

  const handleAppointment = () => {
    setAppointment(true);
  };

  const router = useRouter();

  const handleSignIn = () => {
    router.push("/signIn");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    setToken(storedToken);
  }, []);

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
              Napomena: Termin možete otkazati do 2h pred termin putem email
              poruke koju ste primili ili telefonskim pozivom!
            </p>

            <div className="grid grid-cols-4 gap-2">
              <div className="h-12 grow bg-[#E5E4DF] font-['Montserrat'] font-semibold flex justify-center items-center">
                #
              </div>
              <div className="h-12 grow bg-[#E5E4DF] font-['Montserrat'] font-semibold flex justify-center items-center">
                Datum
              </div>
              <div className="h-12 grow bg-[#E5E4DF] font-['Montserrat'] font-semibold flex justify-center items-center">
                Vreme
              </div>
              <div className="h-12 grow bg-[#E5E4DF] font-['Montserrat'] font-semibold flex justify-center items-center">
                Status
              </div>

              {data?.data?.map((appointment) => (
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

                  <div className="h-12 grow bg-[#E5E4DF] font-['Montserrat'] font-semibold flex justify-center items-center">
                    Status
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div>
              <div className="mt-8 mb-4">
                <div className="flex mb-2">
                  <h1 className="uppercase font-bold text-[#D4AF37] text-3xl flex-1">
                    Lista otkazanih termina
                  </h1>
                </div>

                <div className="grid grid-cols-4 gap-2 ">
                  <div className="h-12 grow bg-[#E5E4DF] font-['Montserrat'] font-semibold flex justify-center items-center">
                    #
                  </div>
                  <div className="h-12 grow bg-[#E5E4DF] font-['Montserrat'] font-semibold flex justify-center items-center">
                    Datum
                  </div>
                  <div className="h-12 grow bg-[#E5E4DF] font-['Montserrat'] font-semibold flex justify-center items-center">
                    Vreme
                  </div>
                  <div className="h-12 grow bg-[#E5E4DF] font-['Montserrat'] font-semibold flex justify-center items-center">
                    Status
                  </div>
                </div>
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

                  <Button
                    onClick={handleAppointment}
                    className="place-self-end"
                  >
                    Zatvori
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppoints;
