import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Total from "./components/Total"
import Content from "./components/Content"

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CourseDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourseDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CourseDescription {
  name: "Such a fun exercise";
  exerciseSubmissionLink: string;
}

interface CourseDescription extends CoursePartBase {
  description: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const courseName = "Half Stack application development";
// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  }
  ,
  {
    name: "Such a fun exercise",
    exerciseCount: 1,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  }
];

const App: React.FC = () => {
  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
