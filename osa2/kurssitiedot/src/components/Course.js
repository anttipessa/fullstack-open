import React from 'react'

const Header = ({ name }) => {
  return (
      <h2>{name}</h2>
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
  const total = parts.reduce( (s,e) =>  s + e.exercises , 0)
  return (
      <b>total of {total} exercises </b>
  )
}

const Part = ({ part, exe }) => {
  return (
    <p>{part} {exe}</p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course