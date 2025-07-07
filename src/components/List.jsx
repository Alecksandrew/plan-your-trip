import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";

export default function List({
  options = [{ id: 1, name: "Durward Reynolds" }],
  initialOption = { name: "Selecione uma opção" },
  className = "",
}) {
  const [selectedOption, setSelectedOption] = useState(initialOption);

  return (
    <div className={className}>
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <ListboxButton className="w-38  border rounded-sm text-sm bg-amber-800">
          {selectedOption.name}
        </ListboxButton>
        <ListboxOptions
          className="w-38 text-center text-sm bg-amber-800 "
          anchor="bottom"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="data-focus:bg-amber-500"
            >
              {option.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
