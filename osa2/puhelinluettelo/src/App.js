import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


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
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
            onChange={handleNameChange} />
        </div>
        <div>number: <input  value={newNumber}
            onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) =>
        <Person key={i} name={person.name} number={person.number} />
      )}
    </div>
  )

}

export default App