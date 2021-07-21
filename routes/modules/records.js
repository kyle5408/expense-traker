const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')
const Category = require('../../config/category.json')
const categories = Category.results



//edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
      //使用moment處理日期
      record.date = moment(record.date).format('YYYY-MM-DD')
      res.render('edit', { record, categories })
    })
    .catch(error => console.log(error))
})


//delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

module.exports = router