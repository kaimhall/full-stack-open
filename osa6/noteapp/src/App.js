import { useEffect } from 'react'
import NewNote from "./components/newNote"
import Notes from "./components/Notes"
import VisibilitFilter from "./components/visibilityFilter"
import noteService from './services/notes'
import { setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect( () => {
    noteService
      .getAll().then(notes => dispatch(setNotes(notes)))
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <VisibilitFilter />
      <Notes />
    </div>
  )
}
export default App