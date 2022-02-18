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
const RenderLanguage = ({object}) => {
  return (
    <ul>
      {Object.values(object).map(value => <li key={value}> {value} </li>)}
    </ul>
  )
}

const RenderImage = ({object}) => {
  return (
    <div>
      <img src={object.svg} alt='flag' height= {200} width={200}/>
    </div>
  )
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
    return (countryList.map(country => <div key={country.name.common}> {country.name.common} </div>))
  }
  else {
    return (
      <div>
        <h2>{countryList[0].name.common}</h2>
        <div>
          Capital: {countryList[0].capital}<br></br>
          Area: {countryList[0].area}<br></br>
          <h2>languages</h2>
          <RenderLanguage object= {countryList[0].languages} />
          <RenderImage object= {countryList[0].flags} />
        </div>
      </div>
    )
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
    </div>
  )
}

export default App;
