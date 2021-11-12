const express = require('express')
const router = express.Router()
const controller = require('./deal.controller')

router.post('/direct', controller.deal_post)

module.exports = router