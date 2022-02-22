import { useEffect, useState } from 'react'
import axios from 'axios'
import personservice from './services/persons'

const Filter = ({changeHandler}) => {
  return (
    <div>
      filter shown with:
      <input onChange = {changeHandler} />
    </div>
  )
}
const PersonForm = ({appStates, handlerFunctions, setFunctions}) => {
  const addPerson = (event) => {
    event.preventDefault()
    const usedNames = appStates.persons.map(p => p.name)
    
    if(usedNames.includes(appStates.newName)) {
      const res = window.confirm(`${appStates.newName} is already added to the phonebook, replace the old number with a new one?`)
      if (res) {
        const id = appStates.persons
          .filter(person => person.name === appStates.newName)
          .map(person => person.id)
        const newObject = {
          name: appStates.newName,
          number: appStates.newNumber,
          id : id[0]
        }
        personservice.updatePerson(id, newObject)
        personservice.getPersons()
          .then(initPersons => {
            setFunctions.setPersons(initPersons)
          })
      }
    }

    else {
      const personObject = {
      name: appStates.newName,
      number: appStates.newNumber,
      }
      personservice
        .createPerson(personObject)
        .then(addedPerson => {
          setFunctions.setPersons(appStates.persons.concat(addedPerson))
        })
      
      setFunctions.setNewName('')
      setFunctions.setNewNumber('')
    }
  }
  return (
    <form onSubmit = {addPerson}>
        <div>
          name:  
          <input value = {appStates.newName} onChange = {handlerFunctions.nameChangeHandler} />
        </div>
        <div>
          number:  
          <input value = {appStates.newNumber} onChange = {handlerFunctions.numberChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const removePerson = (person, setPersons) => {
  const res = window.confirm(`Delete ${person.name}`)
  if (res){
    personservice
      .deletePerson(person.id)   
    personservice
      .getPersons()
      .then(initpersons => {
      setPersons(initpersons)
      })
  }
} 

const Persons = ({persons, filterName, setFunctions}) => {
  const namesToShow = persons.filter(
    p => p.name.toLowerCase().includes(filterName.toLowerCase()))
  return (
    namesToShow.map(p => 
      <div key={p.name}>
        {p.name} {p.number} <button onClick= {() => removePerson(p, setFunctions.setPersons)}> delete </button>
      </div>)
    )
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personservice
      .getPersons()
        .then(initPersons => {
          setPersons(initPersons)
        })
      },
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
  const setFunctions = {setPersons, setNewName, setNewNumber, setFilterName}
  const handlerFunctions = {nameChangeHandler, numberChangeHandler, filterChangeHandler}
  const appStates = {persons, newName, newNumber, filterName}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter changeHandler = {filterChangeHandler} />
      <h3>Add a new</h3>
      <PersonForm 
        appStates={appStates}
        handlerFunctions= {handlerFunctions}
        setFunctions= {setFunctions}
      />
      <h3>Numbers</h3>
        <Persons persons = {persons} filterName = {filterName} setFunctions= {setFunctions} />
    </div>
  )
}

export default App