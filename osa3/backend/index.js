require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')

const Contact = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('req-body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

app.get('/api/persons', (request, response) => {
  Contact.find({})
    .then(contacts => {
      response.json(contacts)
    })
})

app.get('/info', (request, response) => {
  Contact.countDocuments({}, (err, count) => {
    response.send(`<p>Phonebook has info for ${count} people</p><p>${new Date}</p>`)
  })
})


app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
  const contact = new Contact({
    name: request.body.name,
    number: request.body.number
  })
  contact.save().then(savedContact => {
    response.json(savedContact)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Contact.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint!' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  //console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: error.message })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})