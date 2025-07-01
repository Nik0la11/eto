"use client";
import AdminButton from "./AdminButton";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useClick, useSlotID, useStatus } from "./Context";
import { useState } from "react";
import { useToken } from "@/app/components/Context";

const AddAppointment = () => {
  const statuses = ["booked", "missed", "available", "completed"];

  const { isClicked, setIsClicked } = useClick();
  const onlyDate = new Date().toISOString().split("T")[0];
  const { slotID } = useSlotID();
  const { status, setStatus } = useStatus();
  const [selectedStatus, setSelectedStatus] = useState(status || statuses[0]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const { token } = useToken();

  const handleIsClicked = () => {
    setIsClicked(true);
  };

  const handleChangeStatus = () => {
    setIsClicked(true);
    fetch(`${BASE_URL}/v1/admin/change_appointment_status`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slot_id: slotID,
        status: selectedStatus,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => {
        console.log("Error fetching: ", err);
      });
  };

  return (
    <div
      className={`fixed top-0 left-0 flex justify-center items-center z-[9999] h-screen bg-[#00000080] w-full ${isClicked ? "invisible" : "visible"}`}
    >
      <div className=" bg-[#FAF9F6] sm:w-1/2 sm:min-w-[400px] w-[400px] m-auto p-4">
        <div className="flex mb-2">
          <h1 className="font-bold primary-color text-3xl flex-1">
            Status termina
          </h1>
          <XMarkIcon
            className="h-6 w-6 cursor-pointer text-black-600  hover:text-black-900"
            onClick={handleIsClicked}
          />
        </div>
        <div className="flex justify-center">
          <p className="text-xl m-auto text-p-color">Datum: {onlyDate}</p>
        </div>

        <div className="">
          <select
            name=""
            id=""
            className="w-1/2  flex place-self-center p-2 rounded-md text-p-color"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statuses.map((stat) => {
              return (
                <option key={stat} value={stat}>
                  {stat}
                </option>
              );
            })}
          </select>
          <AdminButton
            onClick={handleChangeStatus}
            className="flex place-self-end mt-8"
          >
            Promijeni status
          </AdminButton>
        </div>
      </div>
    </div>
  );
};

export default AddAppointment;
