import React from "react";
import { HealthCheckEntry as HealthCheck } from "../types";
import { Card, Icon, List } from 'semantic-ui-react'
import { useStateValue } from "../state";

const rating = {
  0: { name: "heart" as "heart", color: "green" as "green" },
  1: { name: "heart" as "heart", color: "yellow" as "yellow" },
  2: { name: "heart" as "heart", color: "black" as "black" },
  3: { name: "heart" as "heart", color: "red" as "red" },
};

const HealthCheckEntry: React.FC<{ entry: HealthCheck }> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Card>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name="user doctor" /></Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <Icon {...rating[entry.healthCheckRating]} />
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
export default HealthCheckEntry;