import React from "react";
import type { CoursePart } from "../index"
const Part: React.FC<CoursePart> = props => {

  /**
 * Helper function for exhaustive type checking
 */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (props.name) {
    case "Fundamentals":
      return (
        <p>
          {props.name} {props.description} {props.exerciseCount}
        </p>
      );
    case "Using props to pass data":
      return (
        <p>
          {props.name} {props.groupProjectCount} {props.exerciseCount}
        </p>
      );
    case "Deeper type usage":
      return (
        <p>
          {props.name} {props.description} {props.exerciseSubmissionLink}{" "}
          {props.exerciseCount}
        </p>
      );
    case "Such a fun exercise":
      return (
        <p>
          {props.name} {props.description} {props.exerciseSubmissionLink}{" "}
          {props.exerciseCount}
        </p>
      );
    default:
      return assertNever(props)
  }
};


export default Part