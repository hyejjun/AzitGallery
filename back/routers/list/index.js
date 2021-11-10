const express = require('express')
const router = express.Router()
const controller = require('./list.controller')

router.get('/alllist', controller.all_list_get)
router.post('/pluslist', controller.plus_list_get)

router.get('/allauction', controller.all_auction_get)
router.post('/plusauction', controller.plus_auction_get)

router.post('/queryitem', controller.query_item_post)

router.post('/mynftall',controller.my_nft_all_post)
router.post('/soldnft',controller.sold_nft_post)
router.post('/notsellnft',controller.not_sell_post)

module.exports = router