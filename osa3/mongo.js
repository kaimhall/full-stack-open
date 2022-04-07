const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://kaimhall:${password}@cluster0.qmjnq.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length == 3) {
    Contact.find({}).then(promise => {
        console.log('phonebook:')
        promise.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
    })
}
else {
    const contact = new Contact({
        name: name,
        number: number,
    })
    contact.save().then(promise => {
        console.log(`Added ${promise.name} number ${promise.number} to phonebook`)
        mongoose.connection.close()
    })
}