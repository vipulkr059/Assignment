import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";

interface User {
  id: number;
  firstName: string;
}
const ChipComp = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((json) => setUsers(json.users));
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };
  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && inputValue === "" && chips.length > 0) {
      const updatedUsers = [...users, chips[chips.length - 1]];
      setUsers(updatedUsers);
      removeChip(chips[chips.length - 1].id);
    }
  };

  const handleChipClick = (chip: User) => {
    const updatedUsers = [...users, chip];
    setUsers(updatedUsers);
    removeChip(chip.id);
  };

  const handleOnClick = (user: User) => {
    const newChip: User = { id: user.id, firstName: user.firstName };
    setChips([...chips, newChip]);
    const updatedUsers = users.filter((u) => u.id !== user.id);
    setUsers(updatedUsers);
    setInputValue("");
  };

  const removeChip = (id: number) => {
    const updatedChips = chips.filter((chip) => chip.id !== id);
    setChips(updatedChips);
  };

  return (
    <div className="search-box-container w-full mx-auto p-4 bg-white rounded-md border-b-2">
      <div className="chip-container flex justify-center items-center gap-2 border-b-2 border-violet-500">
        {chips.map((chip) => (
          <span
            key={chip.id}
            className="chip bg-gray-300 text-gray-700 rounded-3xl p-1 m-1 items-center cursor-pointer"
          >
            {chip.firstName}
            <span
              className="chip-close mx-1 font-bold text-lg"
              onClick={() => handleChipClick(chip)}
            >
              &times;
            </span>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onKeyDown={handleInputKeydown}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Type here..."
          className="border-none rounded-md py-2 px-4 w-full outline-none"
        />
      </div>
      {showSuggestions && (
        <ul
          className="users mt-4 border rounded-md overflow-hidden
         shadow-md bg-gray-300 px-5 cursor-pointer"
        >
          {users
            .filter((user) => {
              const input = inputValue.toLowerCase();
              return user.firstName.toLowerCase().startsWith(input);
            })
            .map((user) => (
              <li key={user.id} onClick={() => handleOnClick(user)}>
                {user.firstName}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ChipComp;
