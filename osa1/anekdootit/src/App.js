import React, {useState} from 'react'
import './App.css';

const Display = (props) => (
  <div> {props.text} <br></br>
        has {props.votes} votes
  </div>
  
)

const Button = (props) => (
    <button onClick = {props.handleClick}> {props.text} </button>
)

const randomSelect = (arr) => Math.floor(Math.random()*arr.length)

const vote = (points, selected) => {
  const copy = [...points]
  const position = selected
  copy[position] += 1
  return (copy)
}
const popular = (points) => {
  const max = Math.max(...points)
  const index = points.indexOf(max)
  return (index)
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>
      <h1>Anecdote of the day</h1> 
      <Display text = {anecdotes[selected]} votes = {points[selected]} /> 
      <Button handleClick = {() => setPoints(vote(points,selected))} text= 'vote' />
      <Button handleClick = {() => setSelected(randomSelect(anecdotes))} text = 'next anectode' />
      <h1>Anecdote with most votes</h1>
      <Display text= {anecdotes[popular(points)]} votes={points[popular(points)]} />
    </div>
  )
}

export default App;
