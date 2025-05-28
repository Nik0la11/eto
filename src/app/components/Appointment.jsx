"use client";

import Button from "./Button";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Appointment = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const getNextThreeDays = () => {
    const dates = [];

    for (let i = 0; i < 3; i++) {
      const date = new Date();

      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const dates = getNextThreeDays();

  const generateTimeSlots = () => {
    const slots = [];

    for (let i = 9; i < 17; i++) {
      slots.push(`${i.toString().padStart(2, "0")}: 00`);
      slots.push(`${i.toString().padStart(2, "0")}: 30`);
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const surname = searchParams.get("surname");
  const number = searchParams.get("number");
  const logedIn = searchParams.get("logedIn") === "true";

  return (
    logedIn && (
      <div className="w-3/4 m-auto bg-[#FAF9F6]">
        <div>
          <h1 className="uppercase font-bold text-[#D4AF37] text-3xl  pt-24 pb-12">
            • Zakažite vaš termin
          </h1>

          <select
            className="w-full m-auto p-4 text-[#444545] font-['Montserrat']"
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {dates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toDateString()}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-y-4 my-12 gap-x-8 w-3/4 m-auto">
          {timeSlots.map((time) => (
            <Button key={time} onClick={() => setSelectedTime(time)}>
              {time}
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
              value={`${name || ""} ${surname || ""}`.trim()}
            />
            <label className="font-['Montserrat'] pt-4">
              Vaš broj telefona:
            </label>
            <input
              type="text"
              placeholder="Unesite broj telefona"
              readOnly
              className="border p-2 rounded focus:outline-none"
              value={number}
            />
            <label className="font-['Montserrat'] pt-4">
              Vaša email adresa:
            </label>
            <input
              type="text"
              placeholder="Unesite email"
              readOnly
              className="border p-2 rounded focus:outline-none"
              value={email}
            />
            <label className="font-['Montserrat'] pt-4">Datum:</label>
            <input
              type="text"
              placeholder="Izaberite datum"
              readOnly
              className="border p-2 rounded focus:outline-none"
              value={selectedDate}
            />
            <label className="font-['Montserrat'] pt-4">Termin:</label>
            <input
              type="text"
              placeholder="Izaberite termin"
              readOnly
              className="border p-2 rounded focus:outline-none"
              value={selectedTime}
            />

            <Button
              className={`self-center mt-4 ${selectedTime ? "visible" : "invisible"}`}
            >
              Zakaži
            </Button>
          </form>
        </div>
      </div>
    )
  );
};

export default Appointment;
