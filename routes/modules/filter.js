const express = require('express')
const router = express.Router()
const moment = require('moment')

const Record = require('../../models/record')
const Category = require('../../config/category.json')
const categories = Category.results

//filter
router.post('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      if (req.body.category === "Select") {
        res.redirect('/')
      } else {
        //篩選
        const recordsFilter = records.filter(record => {
          return record.category === req.body.category
        })
        recordsFilter.forEach(record => {
          totalAmount += record.amount
          record.date = moment(record.date).format('YYYY-MM-DD')
          //icon對照
          categories.forEach(category => {
            if (category.name === record.category) {
              record.icon = category.icon
            }
          })
        })
        res.render('index', { records: recordsFilter, totalAmount, categoryFilter: req.body.category })
      }
    }
    )
    .catch(error => console.error(error))
})



module.exports = router