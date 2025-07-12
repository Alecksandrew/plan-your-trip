import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState, useContext, useEffect } from "react";
import { FormContext } from "../../contexts/formContext";

import type { SetStringAction } from "../../sharedInterfaces/formInterfaces";

interface Option {
  id: number;
  name: string;
}

interface ListProps {
  options: Option[];
  initialOption?: Option;
  dispatchType: SetStringAction['type'];
}

export default function List({
  options = [
    { id: 1, name: "Durward Reynolds" },
    { id: 2, name: "Eduardw Phills" },
  ],
  initialOption = { id: 0, name: "Selecione uma opção" },
  dispatchType
}: ListProps) {
  const [selectedOption, setSelectedOption] = useState(initialOption);

  const { dispatch } = useContext(FormContext);

  useEffect(() => {
    if(selectedOption.name !== initialOption.name) {
      dispatch({ type: dispatchType, payload: selectedOption.name });
    }
  }, [selectedOption]);

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
