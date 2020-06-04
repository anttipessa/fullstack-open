const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-3ii7v.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

person.save().then(response => {
  console.log('person saved!')
  console.log(process.argv[4])
  mongoose.connection.close()
})

Person
  .find({})
  .then(persons => {
    console.log(persons)
    mongoose.connection.close()
  })
