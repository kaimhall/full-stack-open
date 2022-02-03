import React, {useState} from 'react';

const Display = props => <div>{props.val}</div>

const Button = (props) => (
  <button onClick= {props.handleClick}>{props.text}</button>
  )

const App = (props) => {
  const [val, setVal] = useState(10)

  const setToVal = (newVal) => () => {
      setVal(newVal)
    }

  return(
    <div>
      <Display val={val} />
      <Button handleClick = {setToVal(1000)} text = 'thousand' />
      <Button handleClick = {setToVal(0)} text = 'reset' />
      <Button handleClick = {setToVal(val+1)} text = 'increment' />
    </div>
  )
}

export default App
