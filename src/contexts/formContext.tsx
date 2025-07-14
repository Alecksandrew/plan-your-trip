import { createContext } from "react";

import type { FormsAction, FormsState } from "../types/formInterfaces";

export type FormContextType = {
  state?: FormsState;
  dispatch: React.Dispatch<FormsAction>;
};

export const FormContext = createContext<FormContextType>({dispatch: () => {}});
