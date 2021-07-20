const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../config/category.json')
const categories = Category.results



router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      res.render('index', { records, categories })
    })
    .catch(error => console.error(error))
})

module.exports = router
