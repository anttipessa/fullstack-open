import React, { useState, useEffect } from 'react'

const Books = (props) => {

  const [books, setBooks] = useState(props.books)
  const genres = books.map(g => g.genres).reduce((a, b) => a.concat(b), []).filter((x, i, a) => a.indexOf(x) === i)

  useEffect(() => {
    setBooks(props.books)
  }, [props.books]) 

  const submit = (g) => {
    const filter = props.books.filter(b => b.genres.includes(g))
    setBooks(filter)
  }

  const reset = () => {
    setBooks(props.books)
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map((g, i) =>
        < button key={i} onClick={() => submit(g)}> {g}</button>
      )}
      <button onClick={() => reset()}>all genres</button>
    </div >
  )
}

export default Books