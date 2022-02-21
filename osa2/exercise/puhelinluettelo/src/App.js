import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({changeHandler}) => {
  return (
    <div>
      filter shown with:
      <input onChange = {changeHandler} />
    </div>
  )
}
const PersonForm = ({persons, name, number, nameHandler, numberHandler, setPersons, setNumber, setName}) => {
  const addPerson = (event) => {
    event.preventDefault()
    const usedNames = persons.map(p => p.name)
    if(usedNames.includes(name)) {
      window.alert(`${name} is already added to the phonebook`)
    }
    else {
      const personObject = {
      name: name,
      number: number,
      }
      setPersons(persons.concat(personObject))
      setName('')
      setNumber('')
    }
  }
  return (
    <form onSubmit = {addPerson}>
        <div>
          name:  
          <input value = {name} onChange = {nameHandler} />
        </div>
        <div>
          number:  
          <input value = {number} onChange = {numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
const Persons = ({persons, filterName}) => {
  const namesToShow = persons.filter(
    p => p.name.toLowerCase().includes(filterName.toLowerCase()))
    return (
      namesToShow.map(p => <div key={p.name}>{p.name} {p.number}</div>)
    )
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data)
    )},
    [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
   
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
      <Filter changeHandler = {filterChangeHandler} />
      <h3>Add a new</h3>
      <PersonForm 
        persons= {persons} name= {newName} number= {newNumber} 
        nameHandler= {nameChangeHandler} numberHandler={numberChangeHandler}
        setPersons= {setPersons} setName= {setNewName} setNumber= {setNewNumber}
      />
      <h3>Numbers</h3>
        <Persons persons = {persons} filterName = {filterName} />
    </div>
  )
}

export default App