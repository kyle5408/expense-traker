const express = require('express')
const router = express.Router()

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
      })
      res.render('index', { records, categories, totalAmount})
    })
    .catch(error => console.error(error))
})

module.exports = router
