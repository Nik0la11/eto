"use client";
import Button from "./Button";
import { ChevronUpIcon } from "lucide-react";

const TopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed z-50 bottom-2 left-2">
      <Button onClick={scrollToTop}>
        <ChevronUpIcon className="h-6 w-6 text-black-600" />
      </Button>
    </div>
  );
};

export default TopButton;
