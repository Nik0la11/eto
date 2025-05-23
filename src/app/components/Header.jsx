import StyledListItem from "./StyledListItem";
const services = ['Radno vreme', 'Galerija', 'Lokacija', 'Pravilnik', 'Privatnost', 'Moji termini'];

const Header = () => {
    return(
        <div className="flex justify-center items-center p-8 mb-24 fixed z-50 top-0 left-0 w-full bg-[#FAF9F6]">
            <ul className="flex gap-6">
                {services.map((service, index) => (
                    <StyledListItem key={index}>{service}</StyledListItem>
                ))}
            </ul>
        </div>
    )
}

export default Header;