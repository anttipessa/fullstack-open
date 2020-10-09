const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')
require('dotenv').config()
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

const typeDefs = gql`

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

 type Author {
     name: String!,
     id: ID!,
     born: Int
     bookCount: Int
 }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors:[Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }  
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filtered = await Book.find({}).populate('author', { name: 1})
      if (!args.author && !args.genre) return Book.find({})
      if (args.genre) filtered = filtered.filter(b => b.genres.includes(args.genre))
      if (args.author) filtered = filtered.filter(c => c.author.name === args.author)
      return filtered
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const books  =  await Book.find({}).populate('author', { name: 1})
      return books.filter(b => b.author.name === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({name: args.author})
      if (!author){
        author = new Author({ name: args.author, born: null })
        await author.save()
      }
      const book = new Book({ ...args, author: author._id })
      await book.save()
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      if (!author) return null
      author.born = args.setBornTo
      await author.save()
      return author
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  connectToDevTools: true
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})