import express, { Response } from 'express';
import diagnosesService from '../services/diagnoseService';
import { Diagnosis } from '../types';
const router = express.Router();

// router.get('/', (_req, res) => {
//   res.send('diagnoses');
// });
router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosesService.getEntries());
});

// router.post('/', (_req, res) => {
//   res.send(patientService.addPatient(_req.body));
// });

export default router;