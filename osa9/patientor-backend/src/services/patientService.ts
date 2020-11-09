import patientData from '../../data/patients.json'
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types'

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth
    }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
    const newPatientEntry = {
      id: Math.random().toString(36).slice(2),
      ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
  };


export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient
}