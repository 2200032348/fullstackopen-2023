require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
morgan.token('person',  (req) => {
  if (req.method === 'POST') return JSON.stringify(req.body)
  return null
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<div>
      <span>Phonebook has info for ${persons.length} people</span></div>
    <span>${new Date().toString()}</span>`,
    )
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons.map((person) => person.toJSON()))
  })
})



app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name is required'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number is required'
    })
  }
  /*const {name}= body;
    const pers = Person.find(person => {
      console.log(person.name, typeof person.name, name, typeof name, person.name.toLocaleLowerCase() === name.toLocaleLowerCase())
      return person.name.toLocaleLowerCase() === name.toLocaleLowerCase();
    });
    if(pers)
    {
      return response.status(409).json({
        error: 'name must be unique'
      })
    }*/
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {

  const body = request.params.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  Person.findByIdAndUpdate(body.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

const unknownEndpointHandler = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpointHandler)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.message.includes('ObjectId')) {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
