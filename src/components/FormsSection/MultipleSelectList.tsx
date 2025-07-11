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

interface MultipleSelectListProps {
  options: Option[];
}

export default function MultipleSelectList({
  options = [
    { id: 1, name: "Durward Reynolds" },
    { id: 2, name: "Eduardw Phills" },
  ],
}: MultipleSelectListProps) {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  function isSelected(option: Option) {
    return selectedOptions.some((selected) => selected.id === option.id);
  }

  return (
    <>
      <Listbox value={selectedOptions} onChange={setSelectedOptions} multiple>
        <ListboxButton className="custom-container flex-1  data-[open]:rounded-b-none line-clamp-2">
          {selectedOptions.length > 0
            ? selectedOptions.map((option) => option.name).join(", ")
            : "Selecione uma opção"}
        </ListboxButton>
        <ListboxOptions
          className="w-[var(--button-width)] text-center text-sm bg-paleta-03"
          anchor="bottom"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className={`data-focus:bg-paleta-01 data-focus:text-paleta-03 ${
              isSelected(option) ? 'bg-paleta-01 text-paleta-03' : ''
            }`}
            >
              {option.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </>
  );
}
