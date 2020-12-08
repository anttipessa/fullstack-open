import React from "react";
import { Card, Icon, List } from "semantic-ui-react";
import { useStateValue } from "../state";
import { HospitalEntry as Hospital } from "../types";

const HospitalEntry: React.FC<{ entry: Hospital }> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Card>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name="hospital" /></Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <Card.Description><b>Discharge:</b> {entry.discharge.criteria} {entry.discharge.date}</Card.Description>
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
export default HospitalEntry;