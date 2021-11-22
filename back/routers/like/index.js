const express = require('express')
const router = express.Router()
const controller = require('./like.controller')

router.post('/insert', controller.like_insert)
router.post('/list', controller.like_list)

module.exports = router