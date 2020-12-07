import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis } from "../types";
import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  patientInfo: { [id: string]: Patient };
  diagnosis: { [code: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  patientInfo: {},
  diagnosis: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const setPatientList = (content: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: content
  }
}

export const addPatient = (content: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: content
  }
}

export const getPatient = (content: Patient): Action => {
  return {
    type: "GET_PATIENT",
    payload: content
  }
}

export const setDiagnosisList = (content: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: content
  }
}