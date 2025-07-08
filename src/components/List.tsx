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
    <span className={className}>
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <ListboxButton className="min-w-38 p-0.5 border-2 border-paleta-01 rounded-sm active:rounded-none text-sm font-semibold bg-paleta-03">
          {selectedOption.name}
        </ListboxButton>
        <ListboxOptions
          className="w-38 text-center text-sm bg-paleta-03"
          anchor="bottom"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="data-focus:bg-paleta-01 data-focus:text-paleta-03"
            >
              {option.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </span>
  );
}
