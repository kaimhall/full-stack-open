import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, handleClick}) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick= {handleClick}>votes</button>
    </div>
  </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  return(
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map( item => 
        <Anecdote
          key= {item.id}
          anecdote = {item}
          handleClick= { () => 
            dispatch(addVote(item.id))
          }
        />
      )}
    </div>
  )
}
export default AnecdoteList