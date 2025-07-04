"use client";

import Button from "./Button";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useToken } from "./Context";

const Appointment = () => {
  const englishToSerbian = {
    monday: "Ponedjeljak",
    tuesday: "Utorak",
    wednesday: "Sreda",
    thursday: "Četvrtak",
    friday: "Petak",
    saturday: "Subota",
    sunday: "Nedjelja",
  };

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSlotID, setSelectedSlotID] = useState(null);
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const [data, setData] = useState(null);
  const { token } = useToken();
  const [hasMounted, setHasMounted] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const worker_id = 20;

  useEffect(() => {
    if (!token) return;

    fetch(`${BASE_URL}/v1/appointment/get_available_dates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day,
        worker_id,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching data: ", err));
  }, [day, token]);

  const getNextThreeDays = () => {
    const dates = [];

    for (let i = 1; i < 4; i++) {
      const date = new Date();

      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const dates = getNextThreeDays();

  const handleBooking = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/v1/appointment/book/${worker_id}/${selectedSlotID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Booking failed");
      }
      const result = await res.json();
      console.log("Booking result:", result);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return token ? (
    <div className="w-3/4 m-auto bg-[#E5E4DF]">
      <div>
        <h1 className="uppercase font-bold text-[#D4AF37] text-3xl  pt-24 pb-12">
          • Zakažite vaš termin
        </h1>

        <select
          className="w-full m-auto p-4 text-[#444545] font-['Montserrat']"
          onChange={(e) => setDay(e.target.value)}
        >
          {dates.map((date) => {
            const dayOfWeekEnglish = new Date(date)
              .toLocaleDateString("en-US", { weekday: "long" })
              .toLowerCase();

            const serbianDay = englishToSerbian[dayOfWeekEnglish];

            const formattedDate = new Date(date).toLocaleDateString("sr-RS", {
              day: "2-digit",
              month: "2-digit",
              hour12: false,
              year: "numeric",
            });

            return (
              <option key={date} value={date}>
                {`${serbianDay} ${formattedDate}`}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-wrap gap-y-4 my-12 gap-x-4 w-3/4 m-auto justify-center">
        {data?.data?.map((slot) => (
          <Button
            id={slot.id}
            key={slot.id}
            onClick={() => {
              setSelectedTime(slot.start_time);
              setSelectedSlotID(slot.id);
            }}
          >
            {new Date(slot.start_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Button>
        ))}
      </div>
      <div className="mb-12">
        <form className="flex flex-col gap-2">
          <label className="font-['Montserrat'] pt-4">
            Vaše ime i prezime:
          </label>
          <input
            type="tel"
            name="phone"
            pattern="[0-9]{9,15}"
            placeholder="Unesite ime i prezime"
            readOnly
            className="border p-2 rounded focus:outline-none"
            value={""}
          />
          <label className="font-['Montserrat'] pt-4 text-[#2E2E2E]">
            Vaš broj telefona:
          </label>
          <input
            type="text"
            placeholder="Unesite broj telefona"
            readOnly
            className="border p-2 rounded focus:outline-none"
            value={""}
          />
          <label className="font-['Montserrat'] pt-4 text-[#2E2E2E]">
            Vaša email adresa:
          </label>
          <input
            type="text"
            placeholder="Unesite email"
            readOnly
            className="border p-2 rounded focus:outline-none"
            value={""}
          />
          <label className="font-['Montserrat'] pt-4 text-[#2E2E2E]">
            Datum:
          </label>
          <input
            type="text"
            placeholder="Izaberite datum"
            readOnly
            className="border p-2 rounded focus:outline-none"
            value={day || ""}
          />
          <label className="font-['Montserrat'] pt-4 text-[#2E2E2E]">
            Termin:
          </label>
          <input
            type="text"
            placeholder="Izaberite termin"
            readOnly
            className="border p-2 rounded focus:outline-none"
            value={
              new Date(selectedTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }) || ""
            }
          />

          <Button
            className={`self-center mt-4 ${selectedTime ? "visible" : "invisible"}`}
            onClick={handleBooking}
          >
            Zakaži
          </Button>
        </form>
      </div>
    </div>
  ) : null;
};

export default Appointment;
