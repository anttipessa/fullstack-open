import patientData from '../../data/patients.json'
import { Patient, NonSensitivePatientEntry } from '../types'

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


export default {
    getEntries,
    getNonSensitiveEntries
}