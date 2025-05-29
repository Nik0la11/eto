"use client";
const days = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"];
import { useState, useEffect } from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const images = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
  "images/photo4.jpg",
  "images/photo5.jpg",
  "images/photo6.jpg",
  "images/photo7.jpg",
  "images/photo8.jpg",
];

const getBreakpoint = (width) => {
  if (width < 640) return "xs";
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  if (width < 1280) return "lg";
  if (width < 1536) return "xl";
  return "2xl";
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};

const WorkingHoursPage = () => {
  const [hover, setHover] = useState();
  const breakpoint = useBreakpoint();

  let slidesToShow = 2;

  if (breakpoint === "xs") slidesToShow = 2;
  else if (breakpoint === "sm") slidesToShow = 2;
  else if (breakpoint === "md") slidesToShow = 3;
  else if (breakpoint === "lg") slidesToShow = 4;
  else if (breakpoint === "xl") slidesToShow = 5;
  else slidesToShow = 6;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <div className=" bg-[#FAF9F6] pb-24 w-full ">
      {/*--------------------------------------------------- RADNO VREME ---------------------------------------------------*/}
      <div id="hours">
        <h1 className="uppercase font-bold text-[#D4AF37] text-3xl ml-[100px] pt-24 pb-12">
          • Radno vreme
        </h1>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 w-full sm:w-3/4  mx-auto">
          {days.map((day, index) => (
            <li key={index}>
              <div
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(null)}
                className="flex flex-col justify-center items-center p-12 bg-[#B5B5AE] hover:bg-[#D4AF37] transition-all duration-300 "
              >
                <h1 className="uppercase text-3xl font-bold pb-4">{day}</h1>
                {day === "Ned" ? (
                  <p
                    className={`mb-12 uppercase tracking-[-0.12em]  ${hover === index ? "text-gray-800" : "text-[#CFCFCA]"}`}
                  >
                    Zatvoreno
                  </p>
                ) : (
                  <>
                    <p
                      className={
                        hover === index ? "text-gray-800" : "text-[#CFCFCA]"
                      }
                    >
                      08:00
                    </p>
                    <p
                      className={
                        hover === index ? "text-[#CFCFCA]" : "text-gray-800"
                      }
                    >
                      DO
                    </p>
                    <p
                      className={
                        hover === index ? "text-gray-800" : "text-[#CFCFCA]"
                      }
                    >
                      22:00
                    </p>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/*--------------------------------------------------- GALERIJA ---------------------------------------------------*/}

      <hr
        className="border-t border-gray-500 my-24 w-3/4 m-auto"
        id="gallery"
      />
      <div className=" flex flex-col justify-center items-center ">
        <h3 className="font-['Great_Vibes'] text-xl font-bold">Galerija</h3>
        <div className="w-3/4 m-auto">
          <div className="mt-12">
            <Slider {...settings}>
              {images.map((src, index) => (
                <div key={index} className="">
                  <div className="w-[170px] h-[250px] xs:w-[270px] xs:h-[350px] overflow-hidden shadow relative">
                    <Image
                      src={src}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingHoursPage;
