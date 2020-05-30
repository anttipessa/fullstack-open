import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Form from './components/Form'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initial => {
        setPersons(initial)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    let duplicate = false
    persons.forEach(person => {
      if (person.name === newName) {
        window.alert(`${newName} is already added to phonebook`)
        duplicate = true
        setNewName('')
        return
      }
    })

    if (duplicate === false) {
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })

    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const filterPersons = null ? persons : persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue={searchValue} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <Form submit={addPerson} name={newName} nameChange={handleNameChange} number={newNumber} numberChange={handleNumberChange} />
      <h3>Numbers</h3>
      {filterPersons.map((person, i) =>
        <Person key={i} name={person.name} number={person.number} />
      )}
    </div>
  )

}

export default App