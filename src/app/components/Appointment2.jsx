"use client";
import Button from "./Button";
import { UserIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useToken } from "./Context";

const Appointment2 = () => {
  const route = useRouter();
  const { token } = useToken();

  const handleSignIn = () => {
    route.push("/signIn");
  };

  return token ? null : (
    <div className={`my-8`}>
      <div className="flex flex-col w-3/4 m-auto ">
        <h1 className="uppercase font-bold text-[#D4AF37] text-3xl pt-24 pb-4">
          • Morate se prijaviti da biste mogli zakazati termin
        </h1>
      </div>
      <div className="flex w-3/4 m-auto">
        <Button onClick={handleSignIn} className="flex gap-2 text-left">
          <UserIcon className="h-6 w-6 text-black-600" />
          <p>Prijavi se</p>
        </Button>
      </div>
    </div>
  );
};

export default Appointment2;
