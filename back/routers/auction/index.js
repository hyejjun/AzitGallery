const express = require('express')
const router = express.Router()
const controller = require('./auction.controller')

router.post('/auctionprice', controller.auction_price_post)
router.post('/auctioncurrent', controller.auction_current_post)
router.post('/getbalance',controller.auction_getbalacne)

module.exports = router