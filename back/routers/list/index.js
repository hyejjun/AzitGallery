const express = require('express')
const router = express.Router()
const controller = require('./list.controller')

router.get('/alllist', controller.all_list_get)
router.post('/pluslist', controller.plus_list_get)

module.exports = router