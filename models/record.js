const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  icon: {
    type: String,
    require: true,
  }
  ,
  category: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  month: {
    type: Number,
  },
  amount: {
    type: Number,
    require: true,
  },
  merchant: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    require: true
  }
})

module.exports = mongoose.model('Record', recordSchema)