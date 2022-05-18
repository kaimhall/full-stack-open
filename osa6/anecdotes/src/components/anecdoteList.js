import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { removeMessage } from '../reducers/notificationReducer'
import { voteMessage } from '../reducers/notificationReducer'

const Anecdote = ({anecdote, handleClick}) => {
  const divStyle = {
    marginBottom:2
  }
  const btnStyle = {
    marginLeft:4
  }

  return(
    <div>
      <div style={divStyle}>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button style = {btnStyle} onClick= {handleClick}>vote</button>
    </div>
  </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filters)
  let anecdotes = useSelector(state => state.anecdotes)
  if(filter !== ''){
    anecdotes = anecdotes.filter(
        anecdote => anecdote.content.toLowerCase()
        .includes(filter.toLowerCase()))
  }
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