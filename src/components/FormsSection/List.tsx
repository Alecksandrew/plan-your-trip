import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";

interface Option {
  id: number;
  name: string;
}

interface ListProps {
  options: Option[];
  initialOption?: Option;
}

export default function List({
  options = [
    { id: 1, name: "Durward Reynolds" },
    { id: 2, name: "Eduardw Phills" },
  ],
  initialOption = { id: 0, name: "Selecione uma opção" }
}: ListProps) {
  const [selectedOption, setSelectedOption] = useState(initialOption);

  return (
    < >
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <ListboxButton className="custom-container flex-1  data-[open]:rounded-b-none">
          {selectedOption.name}
        </ListboxButton>
        <ListboxOptions
          className="w-[var(--button-width)] text-center text-sm bg-paleta-03"
          anchor="bottom"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="data-focus:bg-paleta-01 data-focus:text-paleta-03">
              {option.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </>
  );
}
