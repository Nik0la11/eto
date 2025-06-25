import { useWorkingHours } from "./Context";
import AdminButton from "./AdminButton";
import { useChosenDays, useChoose } from "./Context";
import ChooseDays from "./ChooseDays";
const WorkingHours = () => {
  const { workingHours, setWorkingHours } = useWorkingHours();
  const { isChooseClicked, setIsChooseClicked } = useChoose();

  const { chosenDays } = useChosenDays([]);

  const handleDaysClick = () => {
    setIsChooseClicked(false);
  };

  return (
    <div className=" h-full w-full overflow-hidden bg-[#E5E4E2] p-4 rounded-lg m-1 flex flex-col justtify-self-end">
      <ChooseDays />
      <h2 className="text-p-color text-2xl font-medium">
        Podešavanje radnog vremena
      </h2>
      <div>
        <div className="flex flex-col gap-2 my-4">
          <h3 className="text-p-color text-lg font medium">Radno vrijeme</h3>
          <AdminButton className="w-1/4" onClick={handleDaysClick}>
            Izaberi dane
          </AdminButton>
        </div>
        <div className="flex flex-col gap-y-2  gap-x-8  m-auto justify-center">
          {chosenDays.map((chosenDay) => (
            <div
              key={chosenDay}
              id={chosenDay}
              className="flex items-center justify-start gap-4 mt-2 mx-4"
            >
              <p className="text-p-color">{chosenDay}</p>
              <label htmlFor="">od:</label>
              <input type="time" className="rounded-md" />
              <label htmlFor="">do:</label>
              <input type="time" className="rounded-md" />
            </div>
          ))}
        </div>
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
  );
};

export default WorkingHours;
