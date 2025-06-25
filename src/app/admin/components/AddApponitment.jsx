"use client";
import AdminButton from "./AdminButton";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useClick } from "./Context";
import { useDate } from "./Context";

const AddAppointment = () => {
  const { isClicked, setIsClicked } = useClick();
  const { date, setDate } = useDate();

  const onlyDate = new Date().toISOString().split("T")[0];

  const handleIsClicked = () => {
    setIsClicked(true);
  };

  return (
    <div
      className={`fixed top-0 left-0 flex justify-center items-center z-[9999] h-screen bg-[#00000080] w-full ${isClicked ? "invisible" : "visible"}`}
    >
      <div className=" bg-[#FAF9F6] sm:w-1/2 sm:min-w-[400px] w-[400px] m-auto p-4">
        <div className="flex mb-2">
          <h1 className="font-bold primary-color text-3xl flex-1">
            Dodaj termin
          </h1>
          <XMarkIcon
            className="h-6 w-6 cursor-pointer text-black-600  hover:text-black-900"
            onClick={handleIsClicked}
          />
        </div>
        <div className="flex justify-center">
          <p className="text-xl m-auto">Datum: {onlyDate}</p>
        </div>

        <div className="my-2">
          <form
            action=""
            className="flex flex-col gap-y-2 my-2 items-left  justify-left"
          >
            <label className="text-p-color">Početak termina:</label>
            <input
              type="time"
              name="start"
              className="border p-1 rounded-lg focus:outline-none"
            />
            <label className="text-p-color">Kraj termina:</label>
            <input
              type="time"
              name="end"
              className="border p-1 rounded-lg focus:outline-none"
            />
            <AdminButton
              onClick={handleIsClicked}
              className="place-self-end mt-8"
            >
              Dodaj
            </AdminButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAppointment;
