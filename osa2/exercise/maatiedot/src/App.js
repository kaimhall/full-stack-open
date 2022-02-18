import {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({changeHandler}) => {
  return (
    <div>
      find countries 
      <input onChange = {changeHandler} />
    </div>
  )
}

const DisplayCountry = (object) => {
  const imageUrl = object.flags.svg
  const languageList = Object.values(object.languages).map(value => `<li>${value}</li>`).join('')
  
  document.getElementById('DisplayCountry').innerHTML = 
    `<div>
      <h2>${object.name.common}</h2>
      <div>
        Capital: ${object.capital}<br>  
        Area: ${object.area}<br>
        <h2>languages</h2>
        <ul>
          ${languageList}
        </ul>
        <img src=${imageUrl} alt='flag' height= ${100} width= ${200}/>
        </div>
    </div>
    ` 
}

const Countries = ({countries, countryFilter}) => {
  const countryList = countries
    .filter(country => country.name.common
    .toLowerCase()
    .includes(countryFilter.toLowerCase()))
  
  if (countryList.length > 10) {
    return ("too many matches, specify another filter")
  }
  
  else if (countryList.length === 0 ||  countryList.length > 1) {
    return (
      countryList.map(
        country => 
        <div key={country.name.common}>
          {country.name.common} 
          <button onClick= {() => DisplayCountry(country) }> show </button>
        </div>
      )
    )
  }

  else {
    DisplayCountry(countryList[0])
    return null
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all?')
      .then(response => 
        setCountries(response.data)
  )}, [])

  const filterChangeHandler = (event) => {
    setCountryFilter(event.target.value)
  }
  //console.log(countries)
  
  return (
    <div >
      <Filter changeHandler = {filterChangeHandler} />
      <Countries countries={countries} countryFilter = {countryFilter} />
      <div id= 'DisplayCountry'></div>
    </div>
  )
}

export default App;
