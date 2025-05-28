"use client";

import StyledListItem from "../components/StyledListItem";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useState } from "react";
import Link from "next/link";

const SignIn = () => {
  const [logedIn, setLogedIn] = useState(true);

  const route = useRouter();

  const handleHome = () => {
    route.push("/");
  };

  const handleRegistration = () => {
    route.push("/registration");
  };

  return (
    <div>
      <div className="bg-[#FAF9F6] h-screen">
        <header className="fixed z-50 top-0 left-0 w-full bg-[#FAF9F6]">
          <div className="flex justify-center items-center p-8 ">
            <ul className="flex">
              <StyledListItem>
                <a
                  href="/"
                  className="border-r-2 border-gray-300 px-4 uppercase"
                >
                  Početna
                </a>
              </StyledListItem>
              <StyledListItem>
                <a href="registration" className="px-4 uppercase">
                  Registracija
                </a>
              </StyledListItem>
            </ul>
          </div>
        </header>
        <div className="flex flex-col justify-center items-center pt-36 bg-[#FAF9F6] ">
          <div className="flex flex-col justify-center mb-8 w-[432px]">
            <div className="pb-2">
              <h3 className="text-2xl font-['Montserrat'] font-bold pb-2">
                Nemate nalog?
              </h3>
              <p className="font-['Montserrat']">
                Zakazivanje je dostupno samo registrovanim korisnicima
              </p>
            </div>
            <Button onClick={handleRegistration}>Registracija</Button>
          </div>
          <div className="flex flex-col justify-center w-[432px]">
            <h3 className="text-2xl font-['Montserrat'] font-bold pb-2">
              Prijava
            </h3>
            <form className="flex flex-col gap-2">
              <p className="font-['Montserrat']">E-mail adresa</p>
              <input
                type="mail"
                name="mail"
                className="border p-2 rounded"
                required
              />
              <div className="flex">
                <p className="font-['Montserrat'] flex-1">Lozinka</p>
                <p className="font-['Montserrat'] text-[#D4AF37]">
                  Zaboravili ste lozinku?
                </p>
              </div>
              <input
                type="password"
                name="password"
                className="border p-2 rounded focus:outline-none"
                required
              />
              <div className="flex">
                <Link
                  href={{
                    pathname: "/",
                    query: {
                      logedIn: logedIn,
                    },
                  }}
                >
                  <Button>Prijava</Button>
                </Link>
              </div>
            </form>
            <p className="font-['Montserrat'] text-[#D4AF37] mt-2">
              Niste dobili verifikacioni mail? Ponovo posšaljite!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
