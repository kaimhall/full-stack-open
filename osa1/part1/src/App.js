import React from 'react';

const Hello = (props) => {
 
  const {age, name} = props.person;
  const bornYear = () => new Date().getFullYear() - age
  
  return (
    <div>
      <p> Hello {name}, you are {age} years old</p>
      <p>
        so you were born {bornYear()}
      </p>  
    </div>
  )
}

const App = (props) => {
  const {counter} = props
  return (
    <div>{counter}</div>
  )
}
export default App
