"use client";
import AdminButton from "./AdminButton";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useClick } from "./Context";

const AddAppointment = ({ privacy, setPrivacy }) => {
  const { isClicked, setIsClicked } = useClick();

  const handleIsClicked = () => {
    setIsClicked(true);
  };

  return (
    <div
      className={`fixed top-0 left-0 flex justify-center items-center z-[9999] h-screen bg-[#00000080] w-full ${isClicked ? "invisible" : "visible"}`}
    >
      <div className=" bg-[#FAF9F6] sm:w-1/2 sm:min-w-[400px] w-[400px] m-auto p-4">
        <div className="flex my-2">
          <h1 className="uppercase font-bold text-[#D4AF37] text-3xl flex-1">
            Politika privatnosti
          </h1>
          <XMarkIcon
            className="h-6 w-6 cursor-pointer text-black-600  hover:text-black-900"
            onClick={handleIsClicked}
          />
        </div>
        <div className="my-2">Ovdje idu ta pravila i sve to</div>
        <div className="flex justify-end ">
          {" "}
          <AdminButton onClick={handleIsClicked} className="place-self-end">
            Zatvori
          </AdminButton>
        </div>
      </div>
    </div>
  );
};

export default AddAppointment;
