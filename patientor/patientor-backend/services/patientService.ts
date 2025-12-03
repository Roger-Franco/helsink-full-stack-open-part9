import patients from '../data/patients';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
// import { v1 as uuid } from 'uuid'
const { v4: uuidv4 } = require("uuid");

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  // const getNonSensitiveEntries = (): Omit<PatientEntry, 'ssn'>[] => {
  // return patients.map(({ ssn, ...patient }) => patient);
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    // id: uuid(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  return patients.find(patient => patient.id === id);
};

export default { getEntries, getNonSensitiveEntries, addPatient, findById };