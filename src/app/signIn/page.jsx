"use client";

import StyledListItem from "../components/StyledListItem";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useState } from "react";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";
import { useToken } from "../components/Context";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const { token, setToken } = useToken();
  const [isClicked, setIsClicked] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const route = useRouter();

  const handleRegistration = () => {
    route.push("/registration");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsClicked(true);
    try {
      const res = await fetch(`${BASE_URL}/v1/authentication/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Sign in failed");
      }

      console.log("signed in");
      const result = await res.json();
      setData(result);
      setToken(result);
      localStorage.setItem("token", result.data);
      console.log("Sign in result:", result);
      route.push("/");
    } catch (err) {
      console.log("Error:", err);
    }
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
              <h3 className="text-2xl font-['Montserrat'] font-bold pb-2 text-[#2E2E2E]">
                Nemate nalog?
              </h3>
              <p className="font-['Montserrat'] text-[#2E2E2E]">
                Zakazivanje je dostupno samo registrovanim korisnicima
              </p>
            </div>
            <Button onClick={handleRegistration}>Registracija</Button>
          </div>
          <div className="flex flex-col justify-center w-[432px]">
            <h3 className="text-2xl font-['Montserrat'] font-bold pb-2 text-[#2E2E2E]">
              Prijava
            </h3>
            <form className="flex flex-col gap-2" onSubmit={handleSignIn}>
              <p className="font-['Montserrat'] text-[#2E2E2E]">
                E-mail adresa
              </p>
              <input
                type="mail"
                name="mail"
                className="border p-2 rounded text-[#444545]"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="flex">
                <p className="font-['Montserrat'] flex-1 text-[#2E2E2E]">
                  Lozinka
                </p>
                <p className="font-['Montserrat'] text-[#D4AF37] text-[#2E2E2E]">
                  Zaboravili ste lozinku?
                </p>
              </div>
              <input
                type="password"
                name="password"
                className="border p-2 rounded focus:outline-none text-[#444545]"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {!token && isClicked === true ? (
                <p className="font-['Montserrat'] text-[#D4AF37] text-red-600">
                  Email ili lozinka nisu tačni. Molimo pokušajte ponovo.
                </p>
              ) : null}

              <div className="flex">
                <Button className="flex gap-2">
                  <UserIcon className="h-6 w-6 text-black-600" />
                  <p>Prijava</p>
                </Button>
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
