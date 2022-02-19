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
const DisplayWeather = (url) => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.getElementById('DisplayWeather').innerHTML = 
      `
      <h2>Weather in ${data.name}</h2>
      <div>temperature ${data.main.temp} celcius</div>
      <img src= 'http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'</img>
      <div>wind ${data.wind.speed} m/s</div>
      `

    })
}
const DisplayCountry = (object) => {
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${object.capital}&units=metric&appid=${api_key}`

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
  DisplayWeather(url)
}

const Countries = ({countries, countryFilter}) => {
  const countryList = countries
    .filter(country => country.name.common
    .toLowerCase()
    .includes(countryFilter.toLowerCase()))
  
  if (countryList.length > 10) {
    document.getElementById('DisplayWeather').innerHTML = ''
    document.getElementById('DisplayCountry').innerHTML = ''
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
  return (
    <div >
      <Filter changeHandler = {filterChangeHandler} />
      <Countries countries={countries} countryFilter = {countryFilter} />
      <div id= 'DisplayCountry'></div>
      <div id= 'DisplayWeather'></div>
    </div>
  )
}

export default App;
