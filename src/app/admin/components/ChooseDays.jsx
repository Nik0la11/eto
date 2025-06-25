"use client";
import AdminButton from "./AdminButton";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useChoose, useChosenDays, useClick } from "./Context";

const ChooseDays = () => {
  const { isChooseClicked, setIsChooseClicked } = useChoose();
  const { chosenDays, setChosenDays } = useChosenDays([]);
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
    <div
      className={`fixed top-0 left-0 flex justify-center items-center z-[9999] h-screen bg-[#00000080] w-full ${isChooseClicked ? "invisible" : "visible"}`}
    >
      <div className=" bg-[#FAF9F6] sm:w-2/5 sm:min-w-[400px] w-[400px] m-auto p-4">
        <div className="flex mb-4">
          <h1 className="font-bold primary-color text-3xl flex-1">
            Izaberi radne dane
          </h1>
          <XMarkIcon
            className="h-6 w-6 cursor-pointer text-black-600  hover:text-black-900"
            onClick={handleIsClicked}
          />
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

            <AdminButton onClick={handleSubmit} className="place-self-end mt-4">
              Sačuvaj
            </AdminButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChooseDays;
