import React, {useState} from 'react'

const Statistics = (props) => {
  if(props.val === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  if(props.text === 'positive') {
    return (
      <div>{props.text} {props.val} %</div>
    )
  }
  return (
   <div>{props.text} {props.val}</div>
  )
}
const Button = (props) => (
  <button onClick= {props.handleClick}>
    {props.text}
  </button>
  )
  
const avg= ({good, bad, neutral}) => {
  let cnt = (good + bad + neutral)
  let res = (good - bad + (neutral * 0))
  let a = res/cnt
  if (isNaN(a)){
    return(0)
  }
  return (a)
}

const pos = ({good , bad, neutral}) => {
  let res = (good/(bad + neutral + good)*100).toFixed(13)
  if (isNaN(res)){
    return(0)
  }
  return(res)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setNBad] = useState(0)
  
  const obj = {
    good: good,
    bad: bad,
    neutral:neutral
  }

  let average = avg(obj)
  let positive = pos(obj)


  console.log(good)
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good +1)} text= 'good' />
      <Button handleClick={() => setNeutral(neutral +1)} text= 'neutral' />
      <Button handleClick={() => setNBad(bad +1)} text= 'bad' />
      <h1>statistics</h1>
      <Statistics val= {good} text='good'/>
      <Statistics val= {neutral} text='neutral'/>
      <Statistics val= {bad} text='bad'/>
      <Statistics val= {good+bad+neutral} text='all'/>
      <Statistics val= {average} text='avegage'/>
      <Statistics val= {positive} text='positive'/>
    </div>
  );
}

export default App;
