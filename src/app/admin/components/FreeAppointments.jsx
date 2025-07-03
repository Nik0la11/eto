"use client";
import AdminButton from "./AdminButton";
import { useState, useEffect } from "react";
import { useToken } from "@/app/components/Context";

const FreeAppointments = () => {
  const englishToSerbian = {
    monday: "Ponedjeljak",
    tuesday: "Utorak",
    wednesday: "Sreda",
    thursday: "Četvrtak",
    friday: "Petak",
    saturday: "Subota",
    sunday: "Nedjelja",
  };

  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const worker_id = 20;
  const [data, setData] = useState();
  const { token } = useToken();
  const [selectedSlotID, setSelectedSlotID] = useState(null);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [date, setDate] = useState(null);
  const [isClicked, setIsClicked] = useState(true);

  // function to get next seven days
  const getNextSevenDays = () => {
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  // Fetching free appointments
  const dates = getNextSevenDays();

  // Handler for delete appointment
  const handleDeleteAppointment = async () => {
    try {
      setIsClicked(true);
      const res = await fetch(
        `${BASE_URL}/v1/admin/remove_slot/${selectedSlotID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).catch((err) => {
        console.log("Error: ", err);
      });

      if (res.ok) {
        const updated = await fetch(
          `${BASE_URL}/v1/appointment/get_available_dates`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              day,
              worker_id,
            }),
            credentials: "include",
          }
        );

        const json = await updated.json();
        setData(json);
        setSelectedSlotID(null);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  //Handler for book appointment
  const handleBookAppointment = async () => {
    try {
      setIsClicked(true);
      const res = await fetch(
        `${BASE_URL}/v1/admin/bookForSomeone/${selectedSlotID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).catch((err) => {
        console.log("Error: ", err);
      });

      if (res.ok) {
        const updated = await fetch(
          `${BASE_URL}/v1/appointment/get_available_dates`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              day,
              worker_id,
            }),
            credentials: "include",
          }
        );

        const json = await updated.json();
        setData(json);
        setSelectedSlotID(null);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  // Handler for create appointment
  const handleCreateAppointment = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(`${BASE_URL}/v1/admin/add_custom_slot`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_time: `${date} ${startTime}:00`,
          appointment_duration: `${duration}m`,
        }),
      }).catch((err) => {
        console.log("Error: ", err);
      });

      if (res.ok) {
        const updated = await fetch(
          `${BASE_URL}/v1/appointment/get_available_dates`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              day,
              worker_id,
            }),
            credentials: "include",
          }
        );

        const json = await updated.json();
        setData(json);
        setSelectedSlotID(null);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

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

  return (
    <div className={`h-screen min-w-screen  box-border p-1`}>
      <div className="h-3/5  bg-[#E5E4E2] p-4 rounded-lg  flex flex-col  ">
        <h2 className="font-bold primary-color text-3xl mb-2">
          Slobodni termini
        </h2>
        <div className="flex flex-col">
          <select
            name=""
            id=""
            className="w-1/2 place-self-center p-2 rounded-md text-p-color"
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
                year: "numeric",
              });

              return (
                <option value={date} key={date}>
                  {`${serbianDay} ${formattedDate}`}
                </option>
              );
            })}
          </select>
          <div className="flex flex-wrap my-4 gap-2 justify-center">
            {data?.data?.map((slot) => (
              <AdminButton
                key={slot.id}
                id={slot.id}
                onClick={() => {
                  setSelectedSlotID(slot.id);
                  setIsClicked(false);
                }}
              >
                {new Date(slot.start_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </AdminButton>
            ))}
          </div>
        </div>
        {isClicked ? null : (
          <div className="flex justify-center items-center gap-4">
            <AdminButton
              className="bg-red-500 hover:bg-red-600 text-p-color w-1/6 self-center text-center"
              onClick={() => handleDeleteAppointment()}
            >
              Izbriši termin
            </AdminButton>

            <AdminButton
              className="bg-green-500 hover:bg-green-600 text-p-color w-1/6 self-center text-center"
              onClick={handleBookAppointment}
            >
              Rezerviši termin
            </AdminButton>
          </div>
        )}
      </div>

      <div className="w-full h-2/5 bg-[#E5E4E2] p-4 rounded-lg mt-1 flex flex-col">
        <h2 className="font-bold primary-color text-3xl">Dodavanje termina</h2>
        <form
          action=""
          className="flex flex-col justify-start gap-4 my-2 "
          onSubmit={handleCreateAppointment}
        >
          <div className="flex gap-2">
            <label htmlFor="" className="text-p-color">
              Datum:
            </label>

            <input
              type="date"
              className="rounded-md w-1/5 text-p-color"
              onChange={(e) => setDate(e.target.value)}
            />

            <label htmlFor="" className="text-p-color">
              Trajanje termina:
            </label>

            <input
              type="number"
              className="rounded-md w-1/5 text-p-color"
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-p-color">
              Pocetak termina:
            </label>

            <input
              type="time"
              className="rounded-md w-1/5 text-p-color"
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <AdminButton type="sumbit">Dodaj termin</AdminButton>
        </form>
      </div>
    </div>
  );
};

export default FreeAppointments;
