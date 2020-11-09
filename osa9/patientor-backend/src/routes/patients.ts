import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
})

router.post('/', (req, res) => {
    const { ssn, name, occupation, gender, dateOfBirth } = req.body;
    const newPatientEntry = patientService.addPatient({
        ssn, name, occupation, gender, dateOfBirth 
      });
    res.json(newPatientEntry);
  });
  

export default router;