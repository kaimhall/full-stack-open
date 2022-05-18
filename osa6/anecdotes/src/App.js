import AnecdoteList from "./components/anecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import Filter from "./components/Filter"

const App = () => {

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