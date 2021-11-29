const express = require('express')
const router = express.Router()
const controller = require('./view.controller')

router.post('/directdeal', controller.get_directdeal_view)
router.post('/auction', controller.get_auction_view)
router.post('/getqty', controller.get_qty)
router.post('/getsize',controller.get_size)

module.exports = router