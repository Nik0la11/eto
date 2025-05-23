const days = ['Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub', 'Ned'];
import { useState  } from "react";

const WorkingHoursPage = () => {
    const [hover, setHover] = useState();
    return(
        <div className="h-screen bg-[#E5E4DF]">
                <h1 className="uppercase font-bold text-[#D4AF37] text-3xl ml-[100px] pt-24 pb-12">• Radno vreme</h1>
                <ul className="flex justify-center align-center gap-8">
                    {days.map((day, index) => (
                        <li key={index}>
                            <div onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(null)} className="flex flex-col justify-center items-center p-12 bg-[#B5B5AE] hover:bg-[#D4AF37] transition-all duration-300 ">
                            <h1 className="uppercase text-3xl font-bold pb-4">{day}</h1>
                            {day === "Ned" ? (
                                <p className={`mb-12 uppercase tracking-[-0.12em]  ${hover === index ? "text-gray-800" : "text-[#CFCFCA]"}`}>Zatvoreno</p>
                            ) : (
                                <>
                                    <p className={hover === index ? "text-gray-800" : "text-[#CFCFCA]"}>08:00</p>
                                    <p className={hover === index ? "text-[#CFCFCA]" : "text-gray-800"}>DO</p>
                                    <p className={hover === index ? "text-gray-800" : "text-[#CFCFCA]"}>22:00</p>
                                </>
                            )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
    )
}

export default WorkingHoursPage;