const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')
const Category = require('../../config/category.json')
const categories = Category.results

router.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
        record.date = moment(record.date).format('YYYY-MM-DD')
        //icon對照
        categories.forEach(category => {
          if (category.name === record.category) {
            record.icon = category.icon
          }
        })
      })
      res.render('index', { records, totalAmount, categories })
    })
    .catch(error => console.error(error))
})

module.exports = router
