import LabeledList from "./LabeledList";
import SearchSection from "./SearchSection";
import DatePicker from "./DatePicker";
import LabeledMultipleSelect from "./LabeledMultipleSelect";

export default function FormSection() {
  return (
    <form action="" className="custom-section grid grid-cols-1 md:grid-cols-2 gap-2">
      
      <SearchSection/>
      <DatePicker />
      <div className="grid grid-cols-2 gap-2 md:col-span-full">
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
        <LabeledList //TROCAR POR UM MULTISELECT POSTERIORMENTE
          title="Perfil do viajante"
          optionsObject={[
            { id: 1, name: "Viajante solo" },
            { id: 2, name: "Casal" },
            { id: 3, name: "Família" },
            { id: 4, name: "Grupo de amigos" },
          ]}
        />
      </div>
      <button type="button" className="custom-container
       bg-paleta-01 text-paleta-03 font-bold w-full col-span-full mt-4">
        Search your itinerary
      </button>
    </form>
  );
}
