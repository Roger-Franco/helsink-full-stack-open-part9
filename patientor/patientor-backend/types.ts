// import { NewEntrySchema } from './utils';
// import { z } from 'zod';

// export interface PatientEntry {
//   id: string;
//   name: string;
//   dateOfBirth: string;
//   ssn: string;
//   // gender: string;
//   gender: Gender;
//   occupation: string;
// }

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  // diagnosisCodes?: string[];
  diagnosisCodes?: Array<Diagnosis['code']>;
  // diagnosisCodes?: Diagnosis['code'][];
}

export interface Diagnosis {
  // export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


// Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
// type EntryWithoutId = UnionOmit<Entry, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum entriesTypes {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital'
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  // entries: EntryWithoutId[]
  entries: Entry[]
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export interface PatientEntry extends NewPatientEntry {
  id: string;
}

// export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

export type NewPatientEntry = Omit<Patient, 'id'>;

// export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
// export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;