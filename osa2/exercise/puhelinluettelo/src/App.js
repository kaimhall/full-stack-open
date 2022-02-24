import { useEffect, useState } from 'react'
import personservice from './services/persons'

const Notification = ({displayMessage, errorCode}) => {
  
  const okMessage = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle:'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom:10
  }

  const notOkMessage = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle:'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom:10
  }

  if (displayMessage === null) {
    return null
  }

  else if (errorCode) {
    return (
      <div style= {notOkMessage}>
        {displayMessage}
      </div>
    ) 
  }
  else {
    return (
      <div style= {okMessage}>
        {displayMessage}
      </div>
    )
  }
}

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
        .catch(error => {
          setFunctions.setDisplayMessage( `Information of  ${newObject.name} has allready been removed from server`)
          setFunctions.setErrorCode(error)
          setTimeout(() => {
            setFunctions.setDisplayMessage(null)
          }, 5000)        
        })

        personservice.getPersons()
          .then(initPersons => {
            setFunctions.setPersons(initPersons)
          })
         
        setFunctions.setDisplayMessage(`${newObject.name} updated`)
        setFunctions.setErrorCode(null)
        setTimeout(() => {
          setFunctions.setDisplayMessage(null)
        }, 5000) 
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
        .catch(error => {
          setFunctions.setDisplayMessage(`adding ${personObject.name} failed`)
          setFunctions.setErrorCode(error)
        })

      setFunctions.setDisplayMessage(`added ${personObject.name}`)
      setFunctions.setErrorCode(null)
      setTimeout(() => {
        setFunctions.setDisplayMessage(null)
      }, 5000) 
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

const removePerson = (person, setFunctions) => {
  const res = window.confirm(`Delete ${person.name}`)
  if (res){
    personservice
      .deletePerson(person.id)
      .catch(error => {
        setFunctions.setDisplayMessage(  `Information of  ${person.name} has allready been removed from server`)
        setFunctions.setErrorCode(error)
        setTimeout(() => {
          setFunctions.setDisplayMessage(null)
        }, 5000)        
      })  
    personservice
      .getPersons()
      .then(initpersons => {
        setFunctions.setPersons(initpersons)
      })

    setFunctions.setDisplayMessage(`deleted ${person.name}`)
    setFunctions.setErrorCode(null)
    setTimeout(() => {
      setFunctions.setDisplayMessage(null)
    }, 5000) 
  }
} 

const Persons = ({appStates, setFunctions}) => {
  const namesToShow = appStates.persons.filter(
    p => p.name.toLowerCase().includes(appStates.filterName.toLowerCase()))
  return (
    namesToShow.map(p => 
      <div key={p.name}>
        {p.name} {p.number} <button onClick= {() => removePerson(p, setFunctions, appStates)}> delete </button>
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
  const [displayMessage, setDisplayMessage] = useState(null)
  const [errorCode, setErrorCode] = useState(null)
   
  const nameChangeHandler = (event) => {
    setNewName(event.target.value)
  }
  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value)
  }
  const filterChangeHandler = (event) => {
    setFilterName(event.target.value)
  }
  const setFunctions = {setPersons, setNewName, setNewNumber, setFilterName, setDisplayMessage, setErrorCode}
  const handlerFunctions = {nameChangeHandler, numberChangeHandler, filterChangeHandler}
  const appStates = {persons, newName, newNumber, filterName, displayMessage, errorCode}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification displayMessage = {displayMessage} errorCode= {errorCode} />
      <Filter changeHandler = {filterChangeHandler} />
      <h3>Add a new</h3>
      <PersonForm 
        appStates={appStates}
        handlerFunctions= {handlerFunctions}
        setFunctions= {setFunctions}
      />
      <h3>Numbers</h3>
        <Persons appStates= {appStates} setFunctions= {setFunctions} />
    </div>
  )
}

export default App