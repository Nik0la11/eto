"use client";
import AdminButton from "./AdminButton";
import { useChosenDays } from "./Context";
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
  const [disabled1, setDisabled1] = useState(true);
  const [disabled2, setDisabeld2] = useState(true);

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
        console.log(json);

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

  // Handler for generating new appointments
  const handleGenerateNewAppointments = () => {
    if (!token) return;

    const numberOfCheckedDays = chosenDays.length;
    console.log(numberOfCheckedDays);

    fetch(`${BASE_URL}/v1/admin/generate_slots/${numberOfCheckedDays}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => console.log("Result: ", json))
      .catch((err) => console.log("Error fetching generate slots: ", err));
  };

  return (
    <div className=" h-full w-full overflow-x-hidden overflow-y-auto flex flex-col md:flex-row md:overflow-hidden">
      <div className="bg-[#E5E4E2] p-4 rounded-lg m-1 flex flex-col w-full md:h-screen w-1/2">
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
                  className="flex items-center justify-start gap-4 mt-2 mx-4 w-full"
                >
                  <p className="text-p-color min-w-[100px]">{chosenDay}</p>
                  <div className="flex justify-center items-center gap-2 flex-grow">
                    <label className="text-p-color">od:</label>
                    <input
                      type="time"
                      className="rounded-md text-p-color"
                      value={workingHours[engDay]?.start || ""}
                      onChange={(e) => {
                        setWorkingHours((prev) => ({
                          ...prev,
                          [engDay]: {
                            ...prev[engDay],
                            start: e.target.value,
                          },
                        }));
                        setDisabeld2(false);
                        setDisabled1(false);
                      }}
                    />
                    <label className="text-p-color">do:</label>
                    <input
                      type="time"
                      className="rounded-md text-p-color"
                      value={workingHours[engDay]?.end || ""}
                      onChange={(e) => {
                        setWorkingHours((prev) => ({
                          ...prev,
                          [engDay]: {
                            ...prev[engDay],
                            end: e.target.value,
                          },
                        }));
                        setDisabeld2(false);
                        setDisabled1(false);
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="md:flex-row  flex flex-col gap-2 my-4">
              <div className="flex flex-col">
                <label htmlFor="" className="text-p-color">
                  Trajanje termina:
                </label>
                <input
                  type="number"
                  className="rounded-md lg:w-3/4 w-1/3 text-center text-p-color"
                  value={appointmentDuration || ""}
                  onChange={(e) => {
                    setAppointmentDuration(e.target.value);
                    setDisabeld2(false);
                    setDisabled1(false);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-p-color ">
                  Trajanje pauze izmedju termina:
                </label>
                <input
                  type="number"
                  className="rounded-md lg:w-3/4 w-1/3 text-center text-p-color "
                  value={pauseBetween || ""}
                  onChange={(e) => {
                    setPauseBetween(e.target.value);
                    setDisabeld2(false);
                    setDisabled1(false);
                  }}
                />
              </div>
            </div>
            <AdminButton disabled={disabled1} className="lg:w-1/2 w-2/3">
              Sačuvaj podešavanja
            </AdminButton>
          </form>
          <AdminButton
            disabled={disabled2}
            className="lg:w-1/2 w-2/3 my-2"
            onClick={handleGenerateNewAppointments}
          >
            Kreiraj nove termine
          </AdminButton>
        </div>
      </div>
      <div className=" bg-[#E5E4E2] p-4 rounded-lg m-1 flex flex-col w-full md:h-screen w-1/2">
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
                <label
                  htmlFor=""
                  className="text-p-color text-2xl font-medium min-w-[150px] "
                >
                  {day}
                </label>
                <input
                  type="checkbox"
                  value={day}
                  checked={chosenDays.includes(day)}
                  onChange={(e) => {
                    handleCheckboxChange(e), setDisabled1(false);
                  }}
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
