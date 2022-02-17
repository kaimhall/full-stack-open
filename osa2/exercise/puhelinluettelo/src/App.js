import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-12341244'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
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

  const nameChangeHandler = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const numberChangeHandler = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {
      persons.map(p => <div key={p.name}>{p.name} {p.number}</div>)
      }
    </div>
  )
}

export default App