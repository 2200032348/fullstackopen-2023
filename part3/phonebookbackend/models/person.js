const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGO_URI
//const password = process.argv[2]

//const url = `mongodb+srv://harinetid:${password}@reactmongoFreeCluster.ne4i4ak.mongodb.net/?retryWrites=true&w=majority`

console.log('connecting to', url)

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  number: { type: String, minlength: 8,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d{6,100}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'number required']
  },

})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

module.exports = mongoose.model('Person', personSchema)