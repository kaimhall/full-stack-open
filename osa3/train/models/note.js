require('dotenv').config()

const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
console.log(url)

console.log('connecting to ', url)
mongoose.connect(url)
    .then(promise => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 5,
        required: true
    },
    date: {
        type:Date,
        required: true
    },
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returndedObject) => {
        returndedObject.id = returndedObject._id.toString()
        delete returndedObject._id
        delete returndedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
    
