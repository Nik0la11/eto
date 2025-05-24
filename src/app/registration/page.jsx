"use client";

import StyledListItem from "../components/StyledListItem";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Footer from "../components/Footer";

const SignIn = () => {
  const route = useRouter();

  const handleHome = () => {
    route.push("/");
  };

  const handleSignIn = () => {
    route.push("/signIn");
  };

  return (
    <div>
      <div className="bg-[#FAF9F6] pb-24">
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
                <a href="/registration" className="px-4 uppercase">
                  Registracija
                </a>
              </StyledListItem>
            </ul>
          </div>
        </header>
        <div className="flex flex-col justify-center items-center pt-36 bg-[#FAF9F6]">
          <div className="flex flex-col justify-center mb-8 w-[432px]">
            <div className="pb-2">
              <h3 className="text-2xl font-['Montserrat'] font-bold pb-2">
                Već imate nalog?
              </h3>
              <p className="font-['Montserrat']">
                Prijavite se i zakažite vaš termin
              </p>
            </div>
            <Button onClick={handleSignIn}>Prijava</Button>
          </div>
          <div className="flex flex-col justify-center  ">
            <h3 className="text-2xl font-['Montserrat'] font-bold pb-2">
              Registracija
            </h3>
            <form className="flex flex-col gap-2">
              <p className="font-['Montserrat'] pt-4">E-mail adresa</p>
              <input
                type="mail"
                name="mail"
                className="border p-2 rounded"
                required
              />
              <p className="font-['Montserrat'] pt-4">Broj telefona</p>
              <input
                type="tel"
                name="phone"
                className="border p-2 rounded focus:outline-none"
                required
              />
              <div className="flex gap-2 py-4">
                <div className="flex flex-col gap-2">
                  <p className="font-['Montserrat']">Ime</p>
                  <input
                    type="name"
                    name="name"
                    className="border p-2 rounded focus:outline-none flex-1"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-['Montserrat']">Prezime</p>
                  <input
                    type="name"
                    name="surname"
                    className="border p-2 rounded focus:outline-none flex-1"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2 py-4">
                <div className="flex flex-col gap-2">
                  <p className="font-['Montserrat']">Lozinka</p>
                  <input
                    type="password"
                    name="password"
                    className="border p-2 rounded focus:outline-none flex-1"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-['Montserrat']">Ponovite lozinku</p>
                  <input
                    type="password"
                    name="password2"
                    className="border p-2 rounded focus:outline-none flex-1"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-center items-center gap-20">
                <Button className="flex-1">Registracija</Button>
                <label className="flex justify-center items-center gap-1">
                  <input type="checkbox" />
                  <span className="font-['Montserrat']">
                    Prihvatam uslove korišćenja
                  </span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
