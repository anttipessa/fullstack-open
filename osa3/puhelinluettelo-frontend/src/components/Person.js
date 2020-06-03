import React from 'react'

const Person = ({ name, number, del }) => {
  return (
  <p>{name} {number} <button  onClick={del}>delete</button></p>
  )
}

export default Person