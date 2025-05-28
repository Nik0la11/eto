"use client";
import Button from "./Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const RuleBook = ({ appointment, setAppointment }) => {
  const handleAppointment = () => {
    setAppointment(true);
  };

  const searchParams = useSearchParams();

  const logedIn = searchParams.get("logedIn") === "true";

  const route = useRouter();

  const handleSignIn = () => {
    route.push("/signIn");
  };

  return (
    <div
      className={`fixed top-0 left-0 flex justify-center items-center z-[9999] h-screen bg-[#00000080] w-full ${appointment ? "invisible" : "visible"}`}
    >
      <div className=" bg-[#FAF9F6] w-1/2 p-4">
        <div className="mb-4">
          <div className="flex ">
            <h1 className="uppercase font-bold text-[#D4AF37] text-3xl flex-1">
              Lista termina
            </h1>
            <XMarkIcon
              className="h-6 w-6 cursor-pointer text-black-600  hover:text-black-900"
              onClick={handleAppointment}
            />
          </div>

          <div className="my-2">
            <p className="text-red-900 mb-4">
              Napomena: Termin možete otkazati do 2h pred termin putem email
              poruke koju ste primili ili telefonskim pozivom!
            </p>

            <div className="flex justify-center items-center gap-2 w-full">
              <div className="h-12 grow bg-[#E5E4DF] flex justify-center items-center ">
                <p className="font-['Montserrat'] font-semibold">#</p>
              </div>
              <div className="h-12 grow bg-[#E5E4DF]  flex justify-center items-center ">
                <p className="font-['Montserrat'] font-semibold">Datum</p>
              </div>
              <div className="h-12 grow bg-[#E5E4DF]  flex justify-center items-center">
                <p className="font-['Montserrat'] font-semibold">Vreme</p>
              </div>
              <div className="h-12 grow bg-[#E5E4DF]  flex justify-center items-center ">
                <p className="font-['Montserrat'] font-semibold">Status</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-8 mb-4">
            <div className="flex mb-2">
              <h1 className="uppercase font-bold text-[#D4AF37] text-3xl flex-1">
                Lista otkazanih termina
              </h1>
            </div>

            <div className="mb-2">
              <div className="flex justify-center items-center gap-2 w-full">
                <div className="h-12 grow bg-[#E5E4DF] flex justify-center items-center ">
                  <p className="font-['Montserrat'] font-semibold">#</p>
                </div>
                <div className="h-12 grow bg-[#E5E4DF]  flex justify-center items-center ">
                  <p className="font-['Montserrat'] font-semibold">Datum</p>
                </div>
                <div className="h-12 grow bg-[#E5E4DF]  flex justify-center items-center">
                  <p className="font-['Montserrat'] font-semibold">Vreme</p>
                </div>
                <div className="h-12 grow bg-[#E5E4DF]  flex justify-center items-center ">
                  <p className="font-['Montserrat'] font-semibold">Status</p>
                </div>
              </div>
            </div>
          </div>

          <div className="my-2"></div>
        </div>
        <div className="flex justify-end gap-2">
          {!logedIn && (
            <Button onClick={handleSignIn} className="place-self-end">
              Prijava
            </Button>
          )}
          <Button onClick={handleAppointment} className="place-self-end">
            Zatvori
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RuleBook;
