
import React from 'react'


const Recommendations = (props) => {

  if (!props.show) {
    return null
  }

  const books = props.books.filter(b => b.genres.includes(props.user.favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favourite genre <b>{props.user.favoriteGenre}</b></div>
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
