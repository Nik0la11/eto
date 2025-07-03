"use client";
import Button from "./Button";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Privacy = ({ privacy, setPrivacy }) => {
  const handlePrivacy = () => {
    setPrivacy(true);
  };

  return (
    <div
      className={`fixed top-0 left-0 flex justify-center items-center z-[9999] h-screen bg-[#00000080] w-full ${privacy ? "invisible" : "visible"}`}
    >
      <div className=" bg-[#FAF9F6] sm:w-1/2 sm:min-w-[400px] w-[400px] m-auto p-4">
        <div className="flex my-2">
          <h1 className="uppercase font-bold text-[#D4AF37] text-3xl flex-1">
            Politika privatnosti
          </h1>
          <XMarkIcon
            className="h-6 w-6 cursor-pointer text-black-600  hover:text-black-900"
            onClick={handlePrivacy}
          />
        </div>
        <div className="my-2 text-[#444545]">Ovdje idu ta pravila i sve to</div>
        <div className="flex justify-end ">
          {" "}
          <Button onClick={handlePrivacy} className="place-self-end">
            Zatvori
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
