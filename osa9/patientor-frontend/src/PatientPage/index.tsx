import React from "react";
import { useParams } from 'react-router-dom'
import { useStateValue } from "../state";
import { Icon } from 'semantic-ui-react';

const PatientPage: React.FC = () => {
  const [{ patientInfo }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patientInfo[id]

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
    </div>
  );
};

export default PatientPage;
