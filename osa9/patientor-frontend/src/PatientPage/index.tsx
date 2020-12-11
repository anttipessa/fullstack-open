import React, { useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'
import { addEntry, getPatient, useStateValue } from "../state";
import { Button, Icon } from 'semantic-ui-react';
import { Entry, HealthCheckEntry, NewEntry, BaseEntry, HospitalEntry, OccupationalHealthcareEntry, Patient } from "../types";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { apiBaseUrl } from "../constants";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { assertNever } from "../utils";

const PatientPage: React.FC = () => {
  const [{ patientInfo }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>(patientInfo[id]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(getPatient(patientFromApi));
      } catch (err) {
        console.error(err);
      }
    };
    setPatient(patientInfo[id]);
    void fetchPatient();
  }, [patientInfo, dispatch, id]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const dispatchEntry = async (id: string, entry: NewEntry) => {
    const { data: newEntry } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      entry
    );
    dispatch(addEntry(newEntry, id));
  };

  const submitNewEntry = (values: EntryFormValues) => {
    try {
      const {
        description,
        date,
        specialist,
        diagnosisCodes,
        healthCheckRating,
        employerName,
        sickLeave,
        discharge,
        type,
      } = values;
      const newEntryBase: Omit<BaseEntry, 'id'> = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type,
      };
      switch (values.type) {
        case "HealthCheck":
          const newHCEntry: Omit<HealthCheckEntry, 'id'> = {
            ...newEntryBase,
            healthCheckRating,
            type: 'HealthCheck',
          };
          void dispatchEntry(id, newHCEntry);
          break;
        case "Hospital":
          const newHEntry: Omit<HospitalEntry, 'id'> = {
            ...newEntryBase,
            discharge,
            diagnosisCodes,
            type: "Hospital",
          };
          void dispatchEntry(id, newHEntry);
          break;
        case "OccupationalHealthcare":
          const newOHEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
            ...newEntryBase,
            employerName,
            sickLeave,
            type: "OccupationalHealthcare",
          };
          void dispatchEntry(id, newOHEntry);
          break;
        default:
          assertNever(values.type);
          break;
      }
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };



  if (!patient) return null;
  return (
    <div className="Patient">
      <h3>
        {patient.name}{' '}
        {patient.gender === 'male' ? (
          <Icon name="man" />
        ) :
          patient.gender === 'other' ? (
            <Icon name="transgender alternate" />
          ) : (
              <Icon name="woman" />
            )
        }
      </h3>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h4>entries</h4>
      {(patient.entries).map((entry: Entry) =>
        <EntryDetails key={entry.id} entry={entry} />
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;
