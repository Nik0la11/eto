"use client";
import AdminButton from "./AdminButton";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useChoose, useChosenDays, useClick } from "./Context";
import { useState, useEffect } from "react";

const WorkingHours = () => {
  const backendDays = {
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  };

  const days = [
    "Ponedjeljak",
    "Utorak",
    "Sreda",
    "Četvrtak",
    "Petak",
    "Subota",
    "Nedjelja",
  ];

  const serbianToEnglish = {
    Ponedjeljak: "monday",
    Utorak: "tuesday",
    Sreda: "wednesday",
    Četvrtak: "thursday",
    Petak: "friday",
    Subota: "saturday",
    Nedjelja: "sunday",
  };

  const { chosenDays, setChosenDays } = useChosenDays([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const [token, setToken] = useState();
  const [data, setData] = useState();
  const [appointmentDuration, setAppointmentDuration] = useState("");
  const [pauseBetween, setPauseBetween] = useState("");

  // Initialize workingHours with days and empty start/end
  const [workingHours, setWorkingHours] = useState(
    Object.entries(backendDays).reduce((acc, [day]) => {
      acc[day] = { start: "", end: "" };
      return acc;
    }, {})
  );

  // Load token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  // Fetch work settings when token changes
  useEffect(() => {
    if (!token) return;

    fetch(`${BASE_URL}/v1/admin/get_work_settings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())

      .then((json) => {
        setData(json);

        // Parse working hours
        const parsed = Object.entries(backendDays).reduce((acc, [day]) => {
          if (json.data.working_hours[day]) {
            const range = json.data.working_hours[day];
            const [start, end] = range.split("-");
            acc[day] = { start, end };
          } else {
            acc[day] = { start: "", end: "" };
          }
          return acc;
        }, {});

        // Extract chosen days in Serbian
        const daysPicked = Object.entries(parsed)
          .filter(([day, hours]) => hours.start && hours.end)
          .map(([engDay]) => {
            return Object.entries(serbianToEnglish).find(
              ([serbian, eng]) => eng === engDay
            )?.[0];
          })
          .filter(Boolean);

        setChosenDays(daysPicked);
        setWorkingHours(parsed);
        setAppointmentDuration(json.data.appointment_duration);
        setPauseBetween(json.data.pause_between);
      })
      .catch((err) => console.error("Error fetching data: ", err));
  }, [token]);

  // Handler for checkbox toggle
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setChosenDays((prev) => [...prev, value]);
    } else {
      setChosenDays((prev) => prev.filter((day) => day !== value));
    }
    const engDay = serbianToEnglish[value];

    setWorkingHours((prev) => ({ ...prev, [engDay]: { start: "", end: "" } }));
  };

  // Handle form submission
  const handleSubmitForWorkingHours = async (e) => {
    e.preventDefault();
    const formattedWorkingHours = {};

    for (const [day] of Object.entries(backendDays)) {
      if (!workingHours[day]) continue;
      const { start, end } = workingHours[day];
      if (start && end) {
        formattedWorkingHours[day] = `${start}-${end}`;
      }
    }

    const data = {
      working_hours: formattedWorkingHours,
      appointment_duration: Number(appointmentDuration),
      pause_between: Number(pauseBetween),
    };

    fetch(`${BASE_URL}/v1/admin/update_work_settings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }).catch((err) => console.error("Error fetching data: ", err));
  };

  return (
    <div className=" h-full w-full overflow-hidden flex ">
      <div className="h-full w-1/2 bg-[#E5E4E2] p-4 rounded-lg m-1 flex flex-col">
        <h2 className="font-bold primary-color text-3xl ">
          Podešavanje radnog vremena
        </h2>
        <div>
          <div className="flex flex-col gap-2 my-4">
            <h3 className="text-p-color text-lg font medium">Radno vrijeme</h3>
          </div>

          <form
            className="flex flex-col gap-y-2  gap-x-8  m-auto justify-center"
            onSubmit={handleSubmitForWorkingHours}
          >
            {chosenDays.map((chosenDay) => {
              const engDay = serbianToEnglish[chosenDay];
              return (
                <div
                  key={chosenDay}
                  id={chosenDay}
                  className="flex items-center justify-start gap-4 mt-2 mx-4"
                >
                  <p className="text-p-color">{chosenDay}</p>
                  <label htmlFor="">od:</label>
                  <input
                    type="time"
                    className="rounded-md"
                    value={workingHours[engDay]?.start || ""}
                    onChange={(e) => {
                      setWorkingHours((prev) => ({
                        ...prev,
                        [engDay]: {
                          ...prev[engDay],
                          start: e.target.value,
                        },
                      }));
                    }}
                  />
                  <label htmlFor="">do:</label>
                  <input
                    type="time"
                    className="rounded-md"
                    value={workingHours[engDay]?.end || ""}
                    onChange={(e) => {
                      setWorkingHours((prev) => ({
                        ...prev,
                        [engDay]: {
                          ...prev[engDay],
                          end: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
              );
            })}
            <div className="flex my-4">
              <div className="flex flex-col">
                <label htmlFor="" className="text-p-color">
                  Trajanje termina:
                </label>
                <input
                  type="number"
                  className="rounded-md w-3/4 text-center"
                  value={appointmentDuration || ""}
                  onChange={(e) => {
                    setAppointmentDuration(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-p-color ">
                  Trajanje pauze izmedju termina:
                </label>
                <input
                  type="number"
                  className="rounded-md w-3/4 text-center"
                  value={pauseBetween || ""}
                  onChange={(e) => {
                    setPauseBetween(e.target.value);
                  }}
                />
              </div>
            </div>
            <AdminButton className=" w-1/2 ">Kreiraj termine</AdminButton>
          </form>
        </div>
      </div>
      <div className="h-full w-1/2 bg-[#E5E4E2] p-4 rounded-lg m-1 flex flex-col">
        <div className="flex mb-4">
          <h1 className="font-bold primary-color text-3xl flex-1">
            Izaberi radne dane
          </h1>
        </div>

        <div className="my-2">
          <form
            action=""
            className="flex flex-col gap-y-2 my-2 items-left  justify-left"
          >
            {days.map((day) => (
              <div key={day} id={day} className="flex items-center gap-4">
                <label htmlFor="" className="text-p-color text-2xl font-medium">
                  {day}
                </label>
                <input
                  type="checkbox"
                  value={day}
                  checked={chosenDays.includes(day)}
                  onChange={handleCheckboxChange}
                />
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkingHours;
