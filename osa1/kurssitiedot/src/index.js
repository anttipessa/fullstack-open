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
    <>
      <p>
        {props.part1} {props.exe1}
      </p>
      <p>
        {props.part2} {props.exe2}
      </p>
      <p>
        {props.part3} {props.exe3}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exe1 + props.exe2 + props.exe3}</p>
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