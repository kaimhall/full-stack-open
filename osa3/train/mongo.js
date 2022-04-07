const mongoose = require('mongoose')

require('dotenv').config()
const password = process.env.password
console.log(password)

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}
//const password = process.argv[2]

const url = `mongodb+srv://kaimhall:${password}@cluster0.qmjnq.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/*
const note = new Note({
    content: 'Sending note as argv',
    date: new Date(),
    important: true,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})
*/

Note.find({important: false}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})