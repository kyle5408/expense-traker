const Category = require('../category')

const db = require('../../config/mongoose')

const categoryList = require('../../config/category.json')
const categorySeed = categoryList.results

db.once('open', () => {
  categorySeed.forEach(category => {
    Category.create({
      name: category.name,
      icon: category.icon
    })
  })
    .then(() => {
      console.log('Category update successful!')
      process.exit()
    })
    .catch(err => console.log(err))

})
