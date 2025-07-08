import LabeledList from "./LabeledList";
import List from "./List";
import { FaSearch } from "react-icons/fa";
import DatePicker from "./DatePicker";
import MultipleSelectPlaceholder from "./MultipleSelectPlaceholder";

export default function SearchSection() {
  return (
    <form action="" className="flex flex-col gap-4">
      <MultipleSelectPlaceholder />
      <div className="flex ">
        <label>
          <span className="text-base font-bold">
            Para onde você quer viajar?
          </span>
          <div className="flex items-center border-2">
            <FaSearch />
            <input type="search" id="search" name="search" className="flex-1" />
          </div>
        </label>
        <label className="w-full bg-amber-600">
          <span>Duração</span>
          <DatePicker />
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 place-items-center">
        <LabeledList
          title="Orçamento"
          optionsObject={[
            { id: 1, name: "Econômico" },
            { id: 2, name: "Moderado" },
            { id: 3, name: "Luxuoso" },
          ]}
        />
        <LabeledList
          title="Ritmo de viagem"
          optionsObject={[
            { id: 1, name: "Relaxante" },
            { id: 2, name: "Equilibrado" },
            { id: 3, name: "Intenso" },
          ]}
        />
        <LabeledList
          title="Perfil do viajante"
          optionsObject={[
            { id: 1, name: "Viajante solo" },
            { id: 2, name: "Casal" },
            { id: 3, name: "Família" },
            { id: 4, name: "Grupo de amigos" },
          ]}
        />
        <LabeledList
          title="Interesses"
          optionsObject={[
            { id: 1, name: "Natureza" },
            { id: 2, name: "Gastronomia" },
            { id: 3, name: "História" },
            { id: 4, name: "Cultura" },
            { id: 5, name: "Aventura" },
            { id: 6, name: "Praia" },
            { id: 7, name: "Montanha" },
            { id: 8, name: "Vida Noturna" },
            { id: 9, name: "Arte" },
            { id: 10, name: "Religioso" },
            { id: 11, name: "Eventos/Festivais" },
            { id: 12, name: "Fotografia" },
          ]}
        />
      </div>
      <button type="button" className="bg-paleta-01 rounded">
        Search your itinerary
      </button>
    </form>
  );
}
