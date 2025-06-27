"use client";
import AdminButton from "./AdminButton";
import { useState, useEffect } from "react";
import { useToken } from "@/app/components/Context";

const FreeAppointments = () => {
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const worker_id = 20;
  const [data, setData] = useState();
  const { token } = useToken();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

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
    <div className={`h-full w-full overflow-hidden`}>
      <div className="h-3/5 w-full bg-[#E5E4E2] p-4 rounded-lg m-1 flex flex-col justtify-self-end ">
        <h2 className="font-bold primary-color text-3xl ">Slobodni termini</h2>
        <div className="flex flex-col">
          <select
            name=""
            id=""
            className="w-1/2 place-self-center p-2 rounded-md text-p-color"
            onChange={(e) => setDay(e.target.value)}
          >
            {dates.map((date) => (
              <option value={date} key={date}>
                {new Date(date).toDateString()}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap my-4 gap-2 justify-center">
            {data?.data?.map((slot) => (
              <AdminButton key={slot.id} id={slot.id}>
                {new Date(slot.start_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </AdminButton>
            ))}
          </div>
        </div>
        <AdminButton className="bg-red-500 hover:bg-red-600 w-1/6 ">
          Izbriši termin
        </AdminButton>
      </div>

      <div className="w-full h-2/5 bg-[#E5E4E2] p-4 rounded-lg m-1 flex flex-col">
        <h2 className="font-bold primary-color text-3xl ">Dodavanje termina</h2>
        <form action="" className="flex flex-col justify-start gap-4 my-4 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-p-color">
              Datum:
            </label>

            <input type="date" className="rounded-md w-1/5" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-p-color">
              Pocetak termina:
            </label>

            <input type="time" className="rounded-md w-1/5" />
          </div>
          <AdminButton>Dodaj termin</AdminButton>
        </form>
      </div>
    </div>
  );
};

export default FreeAppointments;
