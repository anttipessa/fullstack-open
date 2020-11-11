import React from "react";

interface Course {
  name: string,
  exerciseCount: number
}
const Total: React.FC<{ courses: Course[] }> = ({ courses }) => {
  return (
    <p>
      Number of exercises{" "}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;