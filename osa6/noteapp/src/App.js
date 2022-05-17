import NewNote from "./components/newNote"
import Notes from "./components/Notes"
import VisibilitFilter from "./components/visibilityFilter"

const App = () => {
  return (
    <div>
      <NewNote />
      <VisibilitFilter />
      <Notes />
    </div>
  )
}
export default App