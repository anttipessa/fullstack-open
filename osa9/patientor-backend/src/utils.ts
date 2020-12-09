
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, NewEntry, HealthCheckRating, Discharge, SickLeave, Diagnosis } from './types';
import diagnoseData from '../data/diagnoses.json'

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    entries: []
  };
}

const toNewEntry = (object: any): NewEntry => {
  const baseObject = {
    description: parseString(object.description),
    date: parseString(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: object.diagnosisCodes && parseDiagnosisCodes(object.diagnosisCodes),
  }
  switch (object.type) {
    case 'HealthCheck':
      return {
        ...baseObject,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      }
    case 'Hospital':
      return {
        ...baseObject,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge),
      }
    case 'OccupationalHealthcare':
      return {
        ...baseObject,
        type: 'OccupationalHealthcare',
        employerName: parseString(object.employerName),
        sickLeave: object.sickLeave && parseSickLeave(object.sickLeave)
      }
    default:
      throw new Error('Error')
  }
};

const parseString = (value: any): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing value: ${value}`);
  }
  return value;
}

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> => {
  if (!Array.isArray(codes)) {
    throw new Error('Incorrect type for diagnosis codes, should be array');
  }
  codes.forEach(code => {
    if (!isString(code) || !isValidCode(code)) {
      throw new Error(`Incorrect diagnosis code: ${code}`);
    }
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return codes;
}

const isValidCode = (code: string): boolean => {
      const diagnose = diagnoseData.find((d: { code: string; }) => d.code === code);
      if(!diagnose) {
          throw new Error(`Incorrect code: ${code}`);
      }
  return true;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!isHealthCheckRaiting(rating) || rating === null) {
    throw new Error(`Incorrect or missing health check rating: ${rating}`);
  }
  return rating;
}

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) throw new Error('Missin discharge')
  return {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria)
  }
}

const parseSickLeave = (sickLeave: any): SickLeave => {
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  }
}

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
}

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
}

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
}

const parseDate = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`Incorrect or missing date of birth: ${dateOfBirth}`);
  }
  return dateOfBirth;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRaiting = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

export { toNewPatientEntry, toNewEntry };