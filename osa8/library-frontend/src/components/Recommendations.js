import React, { useState, useEffect } from 'react'
import { ALL_BOOKS_GENRE } from '../queries'
import { useLazyQuery } from '@apollo/client'

const Recommendations = (props) => {

  const [books, setBooks] = useState(props.books)
  const [getGenre, result] = useLazyQuery(ALL_BOOKS_GENRE)
  const genre = props.genre

  useEffect(() => {
    getGenre({ variables: { genre: genre }, fetchPolicy: 'network-only' })
    if (result.data) {
      setBooks(result.data.allBooks)
    }  // eslint-disable-next-line
  }, [result.data, props.books])

  if (!props.show || !props.genre) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <b>{genre}</b></p>
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
    </div>
  )
}

export default Recommendations
