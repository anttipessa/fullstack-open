import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exe={props.exe1} />
      <Part part={props.part2} exe={props.exe2} />
      <Part part={props.part3} exe={props.exe3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exe1 + props.exe2 + props.exe3}</p>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exe}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1.name} exe1={part1.exercises}
        part2={part2.name} exe2={part2.exercises}
        part3={part3.name} exe3={part3.exercises}
      />
      <Total exe1={part1.exercises} exe2={part2.exercises} exe3={part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))