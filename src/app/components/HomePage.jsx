"use client";
import Button from "./Button";
import {
  CalendarDaysIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Instagram } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToken } from "./Context";
import { useState, useEffect } from "react";

const HomePage = ({ appointment, setAppointment }) => {
  const router = useRouter();
  const { token } = useToken();
  const [hasMounted, setHasMounted] = useState(false);

  const handleSignIn = () => {
    router.push("/signIn");
  };

  const handleRegistration = () => {
    router.push("/registration");
  };

  const handleMyAppoints = () => {
    setAppointment(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/");
    window.location.reload();
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#E5E4DF]">
      <div className="flex flex-col items-center">
        <h1 className="text-[#2E2E2E] font-['Great_Vibes'] uppercase font-semibold text-xl">
          Frizerski salon
        </h1>
        <h1 className="py-2">Logo</h1>
      </div>
      <div className="flex items-center justify-center gap-2 py-4">
        {token ? (
          <Link href="#appointment">
            <Button>
              <div className="flex items-center gap-2 justify-center">
                <CalendarDaysIcon className="h-6 w-6 text-black-600" />
                <p>Zakazivanje</p>
              </div>
            </Button>
          </Link>
        ) : (
          <Button onClick={handleSignIn}>
            <div className="flex items-center gap-2 justify-center">
              <p>Prijava</p>
            </div>
          </Button>
        )}
        {token ? (
          <Button>
            <div
              className="flex items-center gap-2 justify-center"
              onClick={handleMyAppoints}
            >
              <UserIcon className="h-6 w-6 text-black-600" />
              <p>Moji termini</p>
            </div>
          </Button>
        ) : (
          <Button>
            <div
              className="flex items-center gap-2 justify-center"
              onClick={handleRegistration}
            >
              <p>Registracija</p>
            </div>
          </Button>
        )}

        <Button
          onClick={() =>
            window.open("https://instagram.com/petroviic_05", "_blank")
          }
        >
          <Instagram size={24} />
        </Button>
      </div>
      {token ? (
        <Button
          onClick={handleSignOut}
          className={`flex items-center gap-2 justify-center `}
        >
          <div>
            <p>Odjava</p>
          </div>
        </Button>
      ) : null}

      <p className="text-xl text-[#2E2E2E]">Usluge koje vrsi frizerski salon</p>
    </div>
  );
};

export default HomePage;
