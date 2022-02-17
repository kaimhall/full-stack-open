import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    const usedNames = persons.map(p => p.name)
    if(usedNames.includes(newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    }
    else {
      const personObject = {
      name: newName,
      number: newNumber,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  const namesToShow = persons.filter(
    p => p.name.toLowerCase().includes(filterName.toLowerCase()))
   

  const nameChangeHandler = (event) => {
    setNewName(event.target.value)
  }
  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value)
  }
  const filterChangeHandler = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:
        <input onChange = {filterChangeHandler} />
      </div>

      <h3>Add a new</h3>
      <form onSubmit = {addPerson}>
        <div>
          name:  
          <input value = {newName} onChange = {nameChangeHandler} />
        </div>
        <div>
          number:  
          <input value = {newNumber} onChange = {numberChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      { namesToShow.map(p => <div key={p.name}>{p.name} {p.number}</div>) }
    </div>
  )
}

export default App