import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countrylist from './components/Countrylist'

const App = () => {

  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        console.log(response)
      })
  }
  useEffect(hook, [])

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleShowButtonClick = (name) => {
    setSearchValue(name)
  }

  const filterCountries = null ? countries : countries.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <div>
      <p>find countries</p>
      <input value={searchValue}
        onChange={handleSearchChange} />
      <Countrylist count={filterCountries} handler={handleShowButtonClick} />
    </div>
  );
}

export default App;
