import patientData from '../../data/patients'
import { Patient, PublicPatient, NewPatientEntry } from '../types'
import toNewPatientEntry from '../utils'

const patients: Array<Patient> = patientData.map(obj => {
  const object = toNewPatientEntry(obj) as Patient
  object.id = obj.id
  return object
})

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

export default {
  getEntries,
  getPatient,
  getNonSensitiveEntries,
  addPatient
}