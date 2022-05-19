import { useEffect } from 'react'
import NewNote from "./components/newNote"
import Notes from "./components/Notes"
import VisibilitFilter from "./components/visibilityFilter"
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect( () => {
    dispatch(initializeNotes())
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