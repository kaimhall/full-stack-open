import React, {useState} from 'react'

const Display = (props) => <div>{props.val}</div>

const Button = (props) => (
  <button onClick= {props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setNBad] = useState(0)
  
  return (
    <div>
      
    </div>
  );
}

export default App;
