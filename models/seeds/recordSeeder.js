const Record = require('../record')

const db = require('../../config/mongoose')

const recordList = require('../../config/record.json')
const recordSeed = recordList.results

const categoryList = require('../../config/category.json')
const categorySeed = categoryList.results

db.once('open', () => {
  recordSeed.forEach(record => {
    //與categorySeed比對找出icon值
    const sortIcon = categorySeed.filter(category => category.name === record.category)[0].icon
    Record.create({
      name: record.name,
      icon: sortIcon,
      category: record.category,
      date: record.date,
      amount: record.amount,
    })
  })
  console.log('Record update successful!')
})