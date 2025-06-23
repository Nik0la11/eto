"use client";
import AdminButton from "./AdminButton";

const Header = () => {
  return (
    <div className="flex justify-between items-center py-2 px-4 bg-[#2A2A2A]">
      <p className="text-white">Logo</p>
      <AdminButton className="">Sign In</AdminButton>
    </div>
  );
};

export default Header;
