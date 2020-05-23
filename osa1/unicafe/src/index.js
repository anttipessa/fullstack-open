import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine  = props => <div> {props.text}{props.value}</div>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const avg = (good - bad) / all 
  const pos = (good / all) * 100 

  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine  text="good " value={good} />
      <StatisticLine  text="neutral " value={neutral} />
      <StatisticLine  text="bad " value={bad} />
      <StatisticLine  text="all " value={all} />
      <StatisticLine  text="average " value={avg} />
      <StatisticLine  text="positive " value={pos + ' %'} />
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>

  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)