import { Icon } from "@iconify/react";

const Services = () => {
  return (
    <div className=" bg-[#FAF9F6] pb-24">
      {/*--------------------------------------------------- USLUGE ---------------------------------------------------*/}

      <hr className="border-t border-gray-500  w-3/4 m-auto" />
      <div>
        <h1 className="uppercase font-bold text-[#D4AF37] text-3xl ml-[100px] pt-24 pb-12">
          • Naše usluge
        </h1>
        <ul className="flex gap-48 justify-center items-center">
          <li className="text-[#2E2E2E] font-['Great_Vibes']  font-semibold ">
            <div className="flex flex-col justify-center items-center max-w-[264px]">
              <Icon
                icon="mdi:scissors-cutting"
                className="w-24 h-24"
                color="#D4AF37"
              />
              <h4 className="pt-4 text-2xl font-['Great_Vibes'] font-bold">
                Šišanje
              </h4>
              <p className="text-[#444545] font-['Montserrat'] text-center">
                Uživajte u vrhunskom iskustvu šišanja u našem frizerskom salonu.
                Naši iskusni frizeri će vam pružiti savršen izgled, prilagođen
                vašem stilu.
              </p>
            </div>
          </li>
          <li className="text-[#2E2E2E] font-['Great_Vibes']  font-semibold ">
            <div className="flex flex-col justify-center items-center max-w-[264px]">
              <Icon
                icon="mdi:razor-double-edge"
                className="w-24 h-24"
                color="#D4AF37"
              />
              <h4 className="pt-4 text-2xl font-['Great_Vibes'] font-bold">
                Uređivanje brade
              </h4>
              <p className="text-[#444545] font-['Montserrat'] text-center">
                Iskažite svoj muški stil uz naše usluge uređivanja brade. Naši
                stručnjaci će oblikovati vašu bradu prema vašim željama i
                pružiti vam besprekoran izgled.
              </p>
            </div>
          </li>
          <li className="text-[#2E2E2E] font-['Great_Vibes']  font-semibold ">
            <div className="flex flex-col justify-center items-center max-w-[264px]">
              <Icon
                icon="mdi:hair-dryer"
                className="w-24 h-24"
                color="#D4AF37"
              />
              <h4 className="pt-4 text-2xl font-['Great_Vibes'] font-bold">
                Pranje kose
              </h4>
              <p className="text-[#444545] font-['Montserrat'] text-center">
                Osećajte se sveže i opušteno nakon naše usluge pranja kose.
                Koristimo najkvalitetnije proizvode kako bismo vašoj kosi
                pružili sjaj i vitalnost.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <hr
        className="border-t border-gray-500  w-3/4 m-auto invisible"
        id="location"
      />
    </div>
  );
};

export default Services;
