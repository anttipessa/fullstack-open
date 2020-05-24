import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ name }) => {
  return (
      <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part.name} exe={part.exercises} />
      )}
    </div>
  )
}

const Total = ({parts}) => {
  let total = 0
  parts.forEach(element => {
    total += element.exercises
  });
  return (
      <p>Number of exercises {total}</p>
  )
}

const Part = ({ part, exe }) => {
  return (
    <p>{part} {exe}</p>
  )
}


const Course = ({ course }) => {
  console.log(course.parts)
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))