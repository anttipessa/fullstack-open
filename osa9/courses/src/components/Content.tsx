import React from "react";

interface Course {
  name: string,
  exerciseCount: number
}

const Content: React.FC<{ courses: Course[] }> = ({ courses }) => {
  return (
    <div>
      {courses.map(c =>
        <p>{c.name} {c.exerciseCount}</p>
      )}
    </div>);
};


export default Content;