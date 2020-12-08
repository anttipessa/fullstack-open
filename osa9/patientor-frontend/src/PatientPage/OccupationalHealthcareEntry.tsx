import React from "react";
import { Card, Icon, List } from "semantic-ui-react";
import { useStateValue } from "../state";
import { OccupationalHealthcareEntry as Occupational } from "../types";

const OccupationalHealthcareEntry: React.FC<{ entry: Occupational }> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Card>
      <Card.Content>
        <Card.Header>{entry.date}   <Icon name="stethoscope" />  {entry.employerName} </Card.Header>
        <Card.Description>{entry.description}</Card.Description>

        {entry.sickLeave && (
          <Card.Content extra>
            <hr />
            <Card.Description><b>Sick Leave</b></Card.Description>
            <Card.Description>
              Start Date: {entry.sickLeave?.startDate}
            </Card.Description>
            <Card.Description>
              End Date: {entry.sickLeave.endDate}
            </Card.Description>
          </Card.Content>
        )}
        {entry.diagnosisCodes && (
          <Card.Content extra>
            <hr />
            <List>
              {entry.diagnosisCodes?.map((item) => (
                <List.Item key={item}>{item}{ } {diagnosis[item].name}</List.Item>
              ))}
            </List>
          </Card.Content>
        )}
      </Card.Content>
    </Card>
  )
}

export default OccupationalHealthcareEntry;