import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { createMessage } from '../reducers/notificationReducer'
import { removeMessage } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnectode= async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    const anecdote = await anecdoteService.createNew(content)
    
    dispatch(addAnecdote(anecdote))
    dispatch(createMessage(anecdote.content))
    setTimeout(() => {
      dispatch(removeMessage(''))
    }, 5000)
  }
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit = {newAnectode} >
        <div><input name= 'anecdote' /></div>
        <button type = 'submit'  >create</button>
      </form>
    </div>
  )
}



export default AnecdoteForm