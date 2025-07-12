export type FormsState = {
  destination: string;
  date: string;
  budget: string;
  pace: string;
  travelerProfile: string;
  transportation: string[];
  style: string[];
  interests: string[];
};

export type SetStringAction = {
  type: 'SET_DESTINATION' | 'SET_DATE' | 'SET_BUDGET' | 'SET_PACE' | 'SET_TRAVELER_PROFILE';
  payload: string;
};

type SetArrayAction = {
  type: 'SET_TRANSPORTATION' | 'SET_STYLE' | 'SET_INTERESTS';
  payload: string[];
};

export type FormsAction = SetStringAction | SetArrayAction;


export interface OptionsObject {
  id: number;
  name: string;
}