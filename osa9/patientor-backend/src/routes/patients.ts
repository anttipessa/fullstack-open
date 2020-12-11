import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
})

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    console.log(req.body)
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(newEntry,  String(req.params.id));
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});


export default router;