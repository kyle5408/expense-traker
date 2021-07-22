const express = require('express')
const router = express.Router()
const moment = require('moment')

const Record = require('../../models/record')
const Category = require('../../config/category.json')
const categories = Category.results

const { buildCheckFunction } = require('express-validator')
const checkParams = buildCheckFunction(['body', 'query', 'params'])
const validationResult = require('express-validator').validationResult


//edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
      //使用moment處理日期
      record.date = moment(record.date).format('YYYY-MM-DD')
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})

router.put('/:id', [checkParams('name', '編輯失敗：未輸入名稱').isLength({ min: 1 }),
checkParams('date', '編輯失敗：未選擇日期').isLength({ min: 1 }),
checkParams('category', '編輯失敗：類別無法為空').custom(value => value !== "Select"),
checkParams('amount', '編輯失敗：金額錯誤').custom(value => value > 0)
], (req, res) => {
  const id = req.params.id
  const errorsResult = validationResult(req)
  if (!errorsResult.isEmpty()) {
    const { name, date, amount } = req.body
    const errorMsg = errorsResult.array()
    return Record.findById(id)
      .lean()
      .then(record => {
        //使用moment處理日期
        record.date = moment(record.date).format('YYYY-MM-DD')
        res.render('edit', { name, date, amount, record, errorMsg: errorMsg })
      })


  } else {
    return Record.findById(id)
      .then(record => {
        record.name = req.body.name
        record.date = req.body.date
        record.category = req.body.category
        record.amount = req.body.amount
        return record.save()
      })
      .then(() => res.redirect(`/`))
      .catch(error => console.log(error))
  }
})

//delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

//new
router.get('/new', (req, res) => {
  return res.render('new', { categories })
})

router.post('/', [checkParams('name', '建立失敗：未輸入名稱').isLength({ min: 1 }),
checkParams('date', '建立失敗：未選擇日期').isLength({ min: 1 }),
checkParams('category', '建立失敗：未選擇類別').custom(value => value !== "Select"),
checkParams('amount', '建立失敗：金額錯誤').custom(value => value > 0)
], (req, res) => {
  const errorsResult = validationResult(req)
  if (!errorsResult.isEmpty()) {
    const { name, date, category, amount } = req.body
    const errorMsg = errorsResult.array()
    res.render('new', {
      name, date, category, amount,
      errorMsg: errorMsg
    })
    return
  } else {
    const { name, date, category, amount } = req.body
    Record.create({ name, date, category, amount })
      .then(() => res.redirect('/'))
      .catch(error =>
        console.log(error))
  }
}
)

module.exports = router