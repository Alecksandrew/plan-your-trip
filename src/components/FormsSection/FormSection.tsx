import { useEffect, useReducer, useContext, createContext } from "react";

import LabeledList from "./LabeledList";
import SearchSection from "./SearchSection";
import DatePicker from "./DatePicker";
import LabeledMultipleSelectList from "./LabeledMultipleSelectList";

//Contexts
import { FormContext } from "../../contexts/formContext";

// Types & Interfaces
import type { FormsState, FormsAction } from "../../sharedInterfaces/formInterfaces";


function formsReducer(state: FormsState, action: FormsAction) {
  switch (action.type) {
    case "SET_DESTINATION":
      return { ...state, destination: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "SET_BUDGET":
      return { ...state, budget: action.payload };
    case "SET_PACE":
      return { ...state, pace: action.payload };
    case "SET_TRAVELER_PROFILE":
      return { ...state, travelerProfile: action.payload };
    case "SET_TRANSPORTATION":
      return { ...state, transportation: action.payload };
    case "SET_STYLE":
      return { ...state, style: action.payload };
    case "SET_INTERESTS":
      return { ...state, interests: action.payload };
    default:
      return state;
  }
}

const initialStateForms = {
  destination: "",
  date: "",
  budget: "",
  pace: "",
  travelerProfile: "",
  transportation: [],
  style: [],
  interests: [],
};

export default function FormSection() {
  const [state, dispatch] = useReducer(formsReducer, initialStateForms);

  return (
    <form
      action=""
      className="custom-section grid grid-cols-1 md:grid-cols-2 gap-2"
    >
      <FormContext.Provider value={{ dispatch }}>
        <SearchSection />
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
            title="Ritmo"
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
          <LabeledMultipleSelectList
            title="Transporte"
            optionsObject={[
              { id: 1, name: "A pé" },
              { id: 2, name: "Transporte público" },
              { id: 3, name: "Carro alugado/própio" },
              { id: 4, name: "Táxi/Uber" },
              { id: 5, name: "Bicicleta" },
            ]}
          />
          <LabeledMultipleSelectList
            title="Estilo"
            optionsObject={[
              { id: 1, name: "Pontos turísticos famosos" },
              { id: 2, name: "Jóias escondidas" },
            ]}
          />
          <LabeledMultipleSelectList
            title="Interesses"
            optionsObject={[
              { id: 1, name: "Cultura e História" },
              { id: 2, name: "Natureza e Ecoturismo" },
              { id: 3, name: "Gastronomia" },
              { id: 4, name: "Atividades radicais" },
              { id: 5, name: "Espiritualidade" },
              { id: 6, name: "Arte" },
              { id: 7, name: "Relaxamento/bem-estar" },
              { id: 8, name: "Festivais" },
              { id: 9, name: "Vida noturna" },
            ]}
          />
        </div>
      </FormContext.Provider>
      <button
        type="button"
        className="custom-container
       bg-paleta-01 text-paleta-03 font-bold w-full col-span-full mt-4"
      >
        Search your itinerary
      </button>
    </form>
  );
}
