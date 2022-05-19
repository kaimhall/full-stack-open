import { useEffect } from "react"
import { useDispatch } from "react-redux"
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from "./reducers/anecdoteReducer"

import AnecdoteList from "./components/anecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import Filter from "./components/Filter"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll()
    .then(aList =>
      dispatch(setAnecdotes(aList)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />  
    </div>
  )
}

export default App