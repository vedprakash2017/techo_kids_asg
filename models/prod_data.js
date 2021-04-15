const mongoose = require('mongoose')

const prodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    description: {
        type: String,
        required: true
      },
    quantity: {
        type: Number,
        required: true
      },
    price: {
        type: Number,
        required: true
      },
    cart: {
      type : Number,
      default : 0,
    }
},
{
  versionKey: false,
})

module.exports = mongoose.model('prod_data', prodSchema)