import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Form from './components/Form'
import personsService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [message, setMessage] = useState(null)

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

    if (!persons.find(p => p.name === newName)) {
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          printMessage(`User ${newName} was added`)
        })
        .catch(error => {
          printMessage(`${error.response.data.error} `, 'error')
        })
    } else {
      const result = window.confirm(`${newName} is already added to phonebook, replace number with a new one?`)
      if (result) {
        const id = persons.filter(person => person.name === newName)[0].id
        personsService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons((persons.map(p => p.id !== id ? p : returnedPerson)))
            printMessage(`User ${newName} number was changed to ${newNumber}`)
          })
          .catch(error => {
            printMessage(`${error.response.data.error} `, 'error')
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteUser = (name, id) => {

    const result = window.confirm(`Delete '${name}' ?`);
    if (result) {
      personsService
        .deleteUser(id)
        .then(returnedNote => {
          setPersons(persons.filter((person => person.name !== name)))
          printMessage(`User ${name} was deleted`)
        })
        .catch(error => {
          printMessage(`${name} was already deleted from server `, 'error')
        })
    }

  }


  const printMessage = (message, type = 'success') => {
    setMessage({ message, type })
    setTimeout(() => {
      setMessage(null)
    }, 3000)
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
      <Notification notification={message} />
      <Filter searchValue={searchValue} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <Form submit={addPerson} name={newName} nameChange={handleNameChange} number={newNumber} numberChange={handleNumberChange} />
      <h3>Numbers</h3>
      {filterPersons.map((person, i) =>
        <Person key={i} name={person.name} number={person.number} del={() => deleteUser(person.name, person.id)} />
      )}
    </div>
  )

}

export default App