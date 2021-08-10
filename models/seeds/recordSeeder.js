const Record = require('../record')
const User = require('../user')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const seedList = require('../../config/record.json')
const seed = seedList.results
const bcrypt = require('bcryptjs')

const SEED_USERS = [{
  name: 'tester',
  email: 'test@test',
  password: 'test',
  recordLists: seed.slice(0, 3)
},
{
  name: 'tryer',
  email: 'try@try',
  password: 'try',
  recordLists: seed.slice(3, 6)
},
]


db.once('open', () => {
  Promise.all(
    Array.from(SEED_USERS, (SEED_USER, i) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash =>
          User.create({
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: hash
          })
        )
        .then(user => {
          const recordList = SEED_USER.recordLists
          return Promise.all(
            Array.from(recordList, (record, i) => {
              const { name, icon, category, date, amount, merchant } = record
              const dateForMonth = new Date(record.date)
              const month = dateForMonth.getMonth() + 1
              const userId = user._id
              return Record.create({ name, icon, category, date, amount, month, merchant, userId })
            }
            )
          )
        })

    })
  )
    .then(() => {
      console.log('Record update successful!')
      process.exit()
    })
    .catch(err => console.log(err))
})








