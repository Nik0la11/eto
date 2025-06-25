import AdminButton from "./AdminButton";
import ChooseDays from "./ChooseDays";
import { useChoose, useChosenDays } from "./Context";
const FreeAppointments = () => {
  const { isChooseClicked, setIsChooseClicked } = useChoose();
  const { chosenDays, setChosenDays } = useChosenDays([]);

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

  const handleDaysClick = () => {
    setIsChooseClicked(false);
  };
  return (
    <div className="h-full w-full overflow-hidden">
      <ChooseDays />
      <div className="flex w-full h-1/2">
        <div className="w-3/5 bg-[#E5E4E2] p-4 rounded-lg m-1 flex flex-col justtify-self-end">
          <h2 className="text-p-color text-2xl font-medium">
            Podešavanje radnog vremena
          </h2>
          <div>
            <div className="flex flex-col gap-2 my-4">
              <h3 className="text-p-color text-lg font medium">
                Radno vrijeme
              </h3>
              <AdminButton className="w-1/4" onClick={handleDaysClick}>
                Izaberi dane
              </AdminButton>
            </div>

            {chosenDays.map((chosenDay) => (
              <div
                key={chosenDay}
                id={chosenDay}
                className="flex items-center justify-start gap-4 mt-2"
              >
                <p className="text-p-color">{chosenDay}</p>
                <label htmlFor="">od:</label>
                <input type="time" className="rounded-md" />
                <label htmlFor="">do:</label>
                <input type="time" className="rounded-md" />
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <h3 className="text-p-color text-lg font medium mb-2">
              Podešavanje termina
            </h3>
            <form action="" className="flex flex-col justify-start gap-2">
              <div className="flex ">
                <div className="flex flex-col">
                  <label htmlFor="" className="text-p-color">
                    Trajanje termina:
                  </label>
                  <input type="number" className="rounded-md w-3/4" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="text-p-color ">
                    Trajanje pauze izmedju termina:
                  </label>
                  <input type="number" className="rounded-md w-3/4" />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-2/5 bg-[#E5E4E2] p-4 rounded-lg m-1 flex flex-col">
          <h2 className="text-p-color text-2xl font-medium">
            Dodavanje termina
          </h2>
          <form action="" className="flex flex-col justify-start gap-4 my-4 ">
            <div className="flex gap-2">
              <label htmlFor="" className="text-p-color">
                Datum:
              </label>

              <input type="date" className="rounded-md w-1/4" />
            </div>
            <div className="flex gap-2">
              <label htmlFor="" className="text-p-color">
                Pocetak termina:
              </label>

              <input type="time" className="rounded-md w-1/4" />
            </div>
            <AdminButton className="mt-32">Dodaj termin</AdminButton>
          </form>
        </div>
      </div>
      <div className="h-1/2 w-full bg-[#E5E4E2] p-4 rounded-lg m-1 flex flex-col justtify-self-end ">
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
    </div>
  );
};

export default FreeAppointments;
