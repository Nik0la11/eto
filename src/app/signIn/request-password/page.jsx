"use client";
import Button from "@/app/components/Button";

const ResetPassword = () => {
  return (
    <div className="bg-[#E5E4DF] h-screen w-screen flex justify-center items-center">
      <div className="bg-[#FAF9F6] w-1/3 h-1/2 flex flex-col justify-left items-left p-4 min-w-[400px]">
        <h1 className=" font-bold text-[#D4AF37] text-3xl pb-12">
          Resetuj lozinku
        </h1>
        <form action="" className="flex flex-col gap-2">
          <label htmlFor="" className="text-[#444545]">
            Nova lozinka:
          </label>
          <input
            type="password"
            className="border p-2 rounded text-[#444545]"
          />
          <label htmlFor="" className="text-[#444545]">
            Ponovo unesi loziniku:
          </label>
          <input
            type="password"
            className="border p-2 rounded text-[#444545]"
          />
          <Button className="mt-4">Promeni lozinku</Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
