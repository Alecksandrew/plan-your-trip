import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState, useEffect, useContext } from "react";
import { FormContext } from "../../contexts/formContext";
import type { SetArrayAction } from "../../types/formInterfaces";

interface Option {
  id: number;
  name: string;
}

interface MultipleSelectListProps {
  options: Option[];
  dispatchType: SetArrayAction["type"];
}

export default function MultipleSelectList({
  options = [
    { id: 1, name: "Durward Reynolds" },
    { id: 2, name: "Eduardw Phills" },
  ],
  dispatchType,
}: MultipleSelectListProps) {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const { dispatch } = useContext(FormContext);

  useEffect(() => {
    dispatch({
      type: dispatchType,
      payload: selectedOptions.map((option) => option.name),
    });
  }, [selectedOptions]);

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
                isSelected(option) ? "bg-paleta-01 text-paleta-03" : ""
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
