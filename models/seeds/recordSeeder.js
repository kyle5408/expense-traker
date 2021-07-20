const Record = require('../record')

const db = require('../../config/mongoose')

const recordList = require('../../config/record.json')
const recordSeed = recordList.results

db.once('open', () => {
  recordSeed.forEach(record => {
    Record.create({
      name: record.name,
      category: record.category,
      date: record.date,
      amount: record.amount,
    })
  })
  console.log('Record update successful!')
})