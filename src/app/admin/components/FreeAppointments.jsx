import AdminButton from "./AdminButton";
import ChooseDays from "./ChooseDays";
import { useChoose, useChosenDays } from "./Context";
import { useFreeAppointments } from "./Context";
const FreeAppointments = () => {
  const { freeAppointments, setFreeAppointments } = useFreeAppointments();

  const getNextSevenDays = () => {
    const dates = [];

    for (let i = 1; i < 8; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const dates = getNextSevenDays();

  return (
    <div className={`h-full w-full overflow-hidden`}>
      <div className="h-3/5 w-full bg-[#E5E4E2] p-4 rounded-lg m-1 flex flex-col justtify-self-end ">
        <h2 className="text-p-color text-2xl font-medium">Slobodni termini</h2>
        <div className="flex flex-col">
          <select
            name=""
            id=""
            className="w-1/2 place-self-center p-2 rounded-md text-p-color"
          >
            {dates.map((date) => (
              <option value={date} key={date}>
                {new Date(date).toDateString()}
              </option>
            ))}
          </select>
          <div>
            <AdminButton>Odredjeni termin</AdminButton>
          </div>
        </div>
        <AdminButton className="bg-red-500 hover:bg-red-600 w-1/6 ">
          Izbriši termin
        </AdminButton>
      </div>

      <div className="w-full h-2/5 bg-[#E5E4E2] p-4 rounded-lg m-1 flex flex-col">
        <h2 className="text-p-color text-2xl font-medium">Dodavanje termina</h2>
        <form action="" className="flex flex-col justify-start gap-4 my-4 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-p-color">
              Datum:
            </label>

            <input type="date" className="rounded-md w-1/5" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-p-color">
              Pocetak termina:
            </label>

            <input type="time" className="rounded-md w-1/5" />
          </div>
          <AdminButton>Dodaj termin</AdminButton>
        </form>
      </div>
    </div>
  );
};

export default FreeAppointments;
