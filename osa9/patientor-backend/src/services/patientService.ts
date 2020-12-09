import patientData from '../../data/patients'
import { Patient, PublicPatient, NewPatientEntry,  NewEntry } from '../types'

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const entry = patients.find(a => a.id === id);
  return entry;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: Math.random().toString(36).slice(2),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: NewEntry, id: string): NewEntry => {
  const newEntry = {
    id: Math.random().toString(36).slice(2),
    ...entry
  };
  const patient = patients.find(p => p.id === id );
  patient?.entries.push(newEntry);
  return newEntry;
};


export default {
  getEntries,
  getPatient,
  getNonSensitiveEntries,
  addPatient,
  addEntry
}