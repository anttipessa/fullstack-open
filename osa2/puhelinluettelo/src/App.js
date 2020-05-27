import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    let duplicate = false
    persons.forEach(person => {
      if (person.name === newName) {
        window.alert(`${newName} is already added to phonebook`)
        duplicate = true
        return
      }
    })
    if (duplicate === false) {
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
            onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((name, i) =>
        <Person key={i} person={name} />
      )}
    </div>
  )

}

export default App