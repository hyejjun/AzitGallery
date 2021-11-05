const express = require('express')
const router = express.Router()
const controller = require('./ship.controller')

router.get('/directdeal', controller.get_directdeal_view)
router.get('/auction', controller.get_auction_view)

module.exports = router