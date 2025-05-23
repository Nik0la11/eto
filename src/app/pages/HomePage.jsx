"use client"
import Button from '../components/Button';
import { CalendarDaysIcon, UserIcon } from '@heroicons/react/24/outline';
import { Instagram } from 'lucide-react';
import { useRouter } from "next/navigation";

const HomePage = () => {
    const router = useRouter();
    
    const handleAppointment = () => {
        router.push('/signIn');
    }

    return(
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
    )
}

export default HomePage;