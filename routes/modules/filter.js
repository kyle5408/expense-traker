const express = require('express')
const router = express.Router()
const moment = require('moment')

const Record = require('../../models/record')
const Category = require('../../config/category.json')
const categories = Category.results

//filter
router.post('/', (req, res) => {
  let totalAmount = 0
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      if (req.body.category === "Select" && req.body.month === "Select") {
        res.redirect('/')
      } else {
        //篩選
        const recordsFilter = records.filter(record => {
          const filterMonth = Number(req.body.month)
          if (req.body.month === 'Select') {
            return record.category === req.body.category
          } else if (req.body.category === 'Select') {
            return record.month === filterMonth
          } else {
            return record.category + record.month === req.body.category + req.body.month
          }
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
        res.render('index', { records: recordsFilter, totalAmount, categoryFilter: req.body.category, monthFilter: req.body.month })
      }
    }
    )
    .catch(error => console.error(error))
})



module.exports = router