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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1} exe1={exercises1}
        part2={part2} exe2={exercises2}
        part3={part3} exe3={exercises3}
      />
      <Total exe1={exercises1} exe2={exercises2} exe3={exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))