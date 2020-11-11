import React from "react";
import Part from "./Part"
import type { CoursePart } from "../index"

const Content: React.FC<{ courses: CoursePart[] }> = ({ courses }) => {

  return (
    <div>
      {courses.map( (c, i) =>
        <Part key={i} {...c}/>
      )}
    </div>);
};

export default Content;