import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const newAnectode= async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    props.addAnecdote(content)
    props.setNotification(`you added '${content}'`, 5)
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

const mapDispatchToProps = (dispatch) => {
  return {
    addAnecdote: (value) => {
      dispatch(addAnecdote(value))
    },
    setNotification: (message, time) => {
      dispatch(setNotification(message, time))
    }
  }
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)