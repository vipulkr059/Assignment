import { useState } from "react";
import "./App.css";

function App() {
  const chips = ["turture", "lays", "doritos", "naachos", "flips"];

  const [selectedChips, setSelectedChips] = useState([""]);

  const [search, setSearch] = useState("");

  let availableChips = [];
  availableChips = chips.filter((chip) => !selectedChips.includes(chip));
  availableChips = availableChips.filter((chip) => chip.includes(search));

  const removeChip = (chipToBeRemove: string) => {
    const updatedChips = selectedChips.filter(
      (chip) => chip !== chipToBeRemove
    );
    setSelectedChips(updatedChips);
  };

  const [showAvailableChips, setShowAvailableChips] = useState(false);

  return (
    <div className="flex justify-center items-center w-full h-screen  ">
      <div className=" border-black-100 border-4 p-2 rounded-3xl flex justify-center items-center gap-2  ">
        <div className="flex justify-center items-center gap-2">
          {selectedChips.length > 0 &&
            selectedChips.map((chip: string) => {
              if (chip !== "") {
                return (
                  <span className=" p-2 rounded-3xl border-2 cursor-pointer">
                    {chip}{" "}
                    <span
                      className=" font-extrabold"
                      onClick={() => {
                        removeChip(chip);
                      }}
                    >
                      X
                    </span>
                  </span>
                );
              }
            })}
        </div>

        <div className=" relative " onFocus={() => setShowAvailableChips(true)}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" outline-none"
          />
          {showAvailableChips && availableChips.length > 0 && (
            <ul className="absolute backdrop-brightness-50 text-white backdrop-blur-lg px-4 py-2 ">
              {availableChips.map((chip: string) => {
                return (
                  <li
                    className=" cursor-pointer "
                    onClick={() =>
                      setSelectedChips((prev) => {
                        return [...prev, chip];
                      })
                    }
                  >
                    {chip}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
