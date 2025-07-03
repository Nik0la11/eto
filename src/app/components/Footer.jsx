import { MapPinIcon, ClockIcon, PhoneIcon } from "@heroicons/react/24/outline";
import StyledListItem from "./StyledListItem";

const Footer = () => {
  return (
    <footer className="bg-[#E5E4DF] p-12 ">
      <div className="flex flex-col justify-center items-center">
        <div className="pb-8">
          <ul className="flex flex-col gap-8 sm:flex-row sm:gap-48">
            <li className="text-[#2E2E2E] font-['Great_Vibes']  font-semibold ">
              <div className="flex flex-col justify-center items-center">
                <MapPinIcon className="w-12 h-12" />
                <h4 className="uppercase pt-4">Adresa</h4>
                <p className="text-[#444545] font-['Montserrat']">
                  Tu ta adresa
                </p>
              </div>
            </li>
            <li className="text-[#2E2E2E] font-['Great_Vibes']  font-semibold ">
              <div className="flex flex-col justify-center items-center">
                <ClockIcon className="w-12 h-12" />
                <h4 className="uppercase pt-4">Radni dani</h4>
                <p className="text-[#444545] font-['Montserrat']">
                  Ponedjeljak-Subota
                </p>
              </div>
            </li>
            <li className="text-[#2E2E2E] font-['Great_Vibes']  font-semibold ">
              <div className="flex flex-col justify-center items-center">
                <PhoneIcon className="w-12 h-12" />
                <h4 className="uppercase pt-4">Pozovite nas</h4>
                <p className="text-[#444545] font-['Montserrat']">
                  Tu taj broj telefona
                </p>
              </div>
            </li>
          </ul>
        </div>
        <hr className="my-4 border-t border-gray-800 w-full" />
        <div className="mt-12">
          <p className="text-[#444545]">
            Ime salona © 2025. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
