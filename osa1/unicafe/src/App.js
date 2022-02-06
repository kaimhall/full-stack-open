import React, {useState} from 'react'

const StatisticsLine = (props) => (
  <table>
    <tbody>
      <tr>
        <td>{props.text} {props.value}</td>
      </tr>
    </tbody>
  </table>
) 

const Statistics = ({good, bad, neutral}) => {
  const cnt = good + bad + neutral
  if (cnt === 0) {  
    return (
      <div>No feedback given</div>
    )
  }
  else {
    const average = ((good - bad )/cnt).toFixed(1)
    const positive = ((good / cnt)*100).toFixed(1)
  
    return (
      <div>
        <StatisticsLine text= 'good' value= {good} />
        <StatisticsLine text= 'neutral' value= {neutral} />
        <StatisticsLine text= 'bad' value= {bad} />
        <StatisticsLine text= 'all' value= {cnt} />
        <StatisticsLine text= 'average' value= {average} />
        <StatisticsLine text= 'positive' value= {positive + '%'} />
      </div>
    )   
  }
}

const Button = (props) => (
  <button onClick= {props.handleClick}>
    {props.text}
  </button>
  )

const App = () => {
  const [feedback, setFeedback] = useState(
    {
      good: 0,
      bad: 0,
      neutral: 0
    } 
  )
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setFeedback({...feedback, good: feedback.good +1})} text= 'good' />
      <Button handleClick={() => setFeedback({...feedback, neutral: feedback.neutral +1})} text= 'neutral' />
      <Button handleClick={() => setFeedback({...feedback, bad: feedback.bad +1})} text= 'bad' />
      <h1>statistics</h1>
      <Statistics {...feedback} />
    </div>
  );
}

export default App;
