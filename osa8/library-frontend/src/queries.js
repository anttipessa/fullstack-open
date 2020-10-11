import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
      title
      published
      genres
      id
      author{
        name
      }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      id
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
     ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
  `
export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born)  {
      name
      born
    }
  }
  `
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
  `
export const USER_INFO = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
  `

export const ALL_BOOKS_GENRE = gql`
  query allBooks($genre: String!){
    allBooks(genre: $genre)  {
      title
      published
      genres
      id
      author{
        name
      }
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`