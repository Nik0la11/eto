"use client";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("./Calendar"), { ssr: false });

const AdminContent = () => {
  return (
    <div className="w-4/5 h-[673px] ">
      <Calendar />
    </div>
  );
};

export default AdminContent;
