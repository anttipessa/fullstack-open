import React, { useState, useEffect } from 'react'
import { ALL_BOOKS_GENRE } from '../queries'
import { useLazyQuery } from '@apollo/client'

const Books = (props) => {

  const [books, setBooks] = useState(props.books)
  const [select, setSelect] = useState('all genres')
  const genres = books.map(g => g.genres).reduce((a, b) => a.concat(b), []).filter((x, i, a) => a.indexOf(x) === i)
  const [getGenre, result] = useLazyQuery(ALL_BOOKS_GENRE,{
    fetchPolicy: 'cache-and-network'
  })
  
  const showGenre = (name) => {
    setSelect(name)
    getGenre({ variables: { genre: name } ,fetchPolicy: 'cache-and-network',})
  }

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    if (props.books) {
      setBooks(props.books)
    }
  }, [props.books])

  const reset = () => {
    setSelect('all genres')
    setBooks(props.books)
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{select}</b></p>
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
        < button key={i} onClick={() => showGenre(g)}> {g}</button>
      )}
      <button onClick={() => reset()}>all genres</button>
    </div >
  )
}

export default Books