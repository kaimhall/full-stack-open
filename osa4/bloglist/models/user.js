const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type:String,
    minLength:[3, 'username must be 3 characters long'],   
    required: [true, 'username is required'],
    unique: [true, 'username must be unique'],
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.password
    delete returnedObject.passwordHash
  }
})

module.exports =  mongoose.model('User', userSchema)