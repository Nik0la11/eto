"use client"
import Button from "./Button";
import { CalendarDaysIcon, UserIcon } from '@heroicons/react/24/outline';
import { Instagram } from 'lucide-react';
import { useRouter } from "next/navigation";
const days = ['Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub', 'Ned'];

const Content = () => {
    const router = useRouter();

    const handleAppointment = () => {
        router.push('/signIn');
    }
    return(
        

        <div>


        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <h1 className="text-[#2E2E2E] font-['Great_Vibes'] uppercase font-semibold text-xl">Frizerski salon</h1>
                <h1 className="py-2">Logo</h1>
            </div>
            <div className="flex items-center justify-center gap-2 py-4">
                <Button onClick={handleAppointment}><div className="flex items-center gap-2 justify-center"><CalendarDaysIcon className="h-6 w-6 text-black-600" /><p>Zakazivanje</p></div></Button>
                <Button><div  className="flex items-center gap-2 justify-center"><UserIcon className="h-6 w-6 text-black-600" /><p>Moji termini</p></div></Button>
                <Button onClick={() => window.open("https://instagram.com/petroviic_05", "_blank")}><Instagram size={24} /></Button>
            </div>
            <p className="text-xl">Usluge koje vrsi frizerski salon</p>
        </div>


            <div className="h-screen bg-[#E5E4DF]">
                <h1 className="uppercase text-bold text-[#D4AF37] ">Radno vreme</h1>
                <ul className="flex justify-center align-center gap-8">
                    {days.map((day, index) => (
                        <li key={index}>
                            <div className="flex flex-col justify-center items-center p-12 bg-[#B5B5AE] hover:bg-[#D4AF37]">
                            <h1 className="uppercase text-3xl font-bold pb-4">{day}</h1>
                            {day === "Ned" ? (
                                <p className="mb-12">Zatvoreno</p>
                            ) : (
                                <>
                                    <p className="text-[#CFCFCA]">08:00</p>
                                    <p>DO</p>
                                    <p  className="text-[#CFCFCA]">22:00</p>
                                </>
                            )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Content;