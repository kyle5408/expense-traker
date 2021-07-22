const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const filter = require('./modules/filter')


router.use('/', home)
router.use('/records', records)
router.use('/filter', filter)


module.exports = router