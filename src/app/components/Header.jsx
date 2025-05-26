import StyledListItem from "./StyledListItem";
const services = [
  "Radno vreme",
  "Galerija",
  "Lokacija",
  "Pravilnik",
  "Privatnost",
  "Moji termini",
];
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-center items-center p-8 mb-24 fixed z-50 top-0 left-0 w-full bg-[#E5E4DF] border-b border-gray-300">
      <ul className="flex gap-6">
        {services.map((service, index) => (
          <Link href="#hours">
            <StyledListItem key={index}>{service}</StyledListItem>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Header;
