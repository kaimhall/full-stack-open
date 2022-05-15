import AnecdoteList from "./components/anecdoteList"

const App = () => {

  return (
    <div>
      <AnecdoteList />

      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App