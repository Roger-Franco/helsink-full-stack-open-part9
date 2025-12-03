import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import { Diagnosis, Patient } from '../types';
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';

const PatientDatailPage = () => {
  const [patient, setpatient] = useState<Patient | null>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>();
  const id = useParams().id;

  useEffect(() => {
    const fetchPatientDetail = async () => {
      if (!id) {
        return null;
      }
      const patientDetail = await patientService.findById(id);
      setpatient(patientDetail);
    }
    fetchPatientDetail();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const result = await patientService.getDiagnoses();
      setDiagnoses(result);
    }
    fetchDiagnoses();
  }, [])
  console.log(patient, 'patient-20');
  console.log(diagnoses, 'diagnoses-20');

  let IconName;
  switch (patient?.gender) {
    case 'male':
      IconName = ManIcon;
      break;
    case 'female':
      IconName = WomanIcon;
      break;
    case 'other':
      IconName = QuestionMarkIcon;
      break;
    default:
      IconName = WomanIcon;
      break;
  }

  const IconEntry = (type: any) => {
    switch (type) {
      case 'Hospital':
        return <LocalHospitalIcon />;
      case 'OccupationalHealthcare':
        return <WorkIcon />;
      case 'HealthCheck':
        return <MedicalServicesIcon />;
      default:
        return <WomanIcon />;
    }
  };

  const entryStyle = {
    border: '1px solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const showDescriotionOfDiagnose = (code: string) => {
    const diagnose = diagnoses?.find(diagnose => diagnose.code === code);
    return diagnose?.name;
  }
  return (
    <div>
      <h1>Patient Datail Page {id}</h1>
      <h2>{patient?.name} <IconName /></h2>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <h3>Entries</h3>
      {patient?.entries?.map(entry => (
        <div key={entry.id} style={entryStyle}>
          <h4>{entry.date} - {IconEntry(entry.type)}</h4>
          <p>{entry.description}</p>
          {entry.diagnosisCodes?.map(code => (
            <p key={code}>{code} - {showDescriotionOfDiagnose(code)}</p>
          ))}
          <p>diagnose by {entry.specialist}</p>
        </div>
      ))}
    </div>
  );
}

export default PatientDatailPage;
