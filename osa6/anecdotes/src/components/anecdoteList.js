import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { removeMessage } from '../reducers/notificationReducer'
import { voteMessage } from '../reducers/notificationReducer'

const Anecdote = ({anecdote, handleClick}) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick= {handleClick}>vote</button>
    </div>
  </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  return(
    <div>
      {anecdotes.map( item => 
        <Anecdote
          key= {item.id}
          anecdote = {item}
          handleClick= { () => {
            dispatch(addVote(item.id))
            dispatch(voteMessage(item.content))
            setTimeout(() => {
              dispatch(removeMessage(''))
            }, 5000)
          }
          }
        />
      )}
    </div>
  )
}
export default AnecdoteList