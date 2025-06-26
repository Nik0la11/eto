import { useWorkingHours } from "./Context";
import AdminButton from "./AdminButton";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useChoose, useChosenDays, useClick } from "./Context";

const WorkingHours = () => {
  const { workingHours, setWorkingHours } = useWorkingHours();
  const { isChooseClicked, setIsChooseClicked } = useChoose();
  const { chosenDays, setChosenDays } = useChosenDays([]);

  const handleDaysClick = () => {
    setIsChooseClicked(false);
  };

  const days = [
    "Ponedjeljak",
    "Utorak",
    "Sreda",
    "Četvrtak",
    "Petak",
    "Subota",
    "Nedjelja",
  ];
  const onlyDate = new Date().toISOString().split("T")[0];

  const handleIsClicked = () => {
    setIsChooseClicked(true);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setChosenDays((prev) => [...prev, value]);
    } else {
      setChosenDays((prev) => prev.filter((day) => day !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsChooseClicked(true);
    console.log("Days:", chosenDays);
  };

  return (
    <div className=" h-full w-full overflow-hidden flex ">
      <div className="h-full w-1/2 bg-[#E5E4E2] p-4 rounded-lg m-1 flex flex-col">
        <h2 className="font-bold primary-color text-3xl ">
          Podešavanje radnog vremena
        </h2>
        <div>
          <div className="flex flex-col gap-2 my-4">
            <h3 className="text-p-color text-lg font medium">Radno vrijeme</h3>
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
        <div className="mt-2 flex flex-col gap-2">
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
            <AdminButton className=" w-1/2 ">Kreiraj termine</AdminButton>
          </form>
        </div>
      </div>
      <div className="h-full w-1/2 bg-[#E5E4E2] p-4 rounded-lg m-1 flex flex-col">
        <div className="flex mb-4">
          <h1 className="font-bold primary-color text-3xl flex-1">
            Izaberi radne dane
          </h1>
        </div>

        <div className="my-2">
          <form
            action=""
            className="flex flex-col gap-y-2 my-2 items-left  justify-left"
          >
            {days.map((day) => (
              <div key={day} id={day} className="flex items-center gap-4">
                <label htmlFor="" className="text-p-color text-2xl font-medium">
                  {day}
                </label>
                <input
                  type="checkbox"
                  value={day}
                  checked={chosenDays.includes(day)}
                  onChange={handleCheckboxChange}
                />
              </div>
            ))}

            <AdminButton
              onClick={handleSubmit}
              className="place-self-end mt-4 w-1/2"
            >
              Sačuvaj
            </AdminButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkingHours;
