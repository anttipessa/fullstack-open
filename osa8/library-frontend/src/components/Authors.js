
import React, { useState } from 'react'
import Select from 'react-select';
import { useMutation } from '@apollo/client'

import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {

  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  const authors = props.authors

  const options = authors.filter(a => a.born == null).map(a => ({ value: a.name, label: a.name}))

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name: name.value, born } })
    setName(null)
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
