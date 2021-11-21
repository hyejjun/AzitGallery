const express = require('express')
const router = express.Router()
const controller = require('./mint.controller.backup')

router.post('/mintnft', controller.mint_nft_post)
router.post('/kiptransfer',controller.KIP7Token_transfer)
router.post('/kipswap',controller.kipswap_post)
router.get('/klaytntest', controller.klaytn_test)
module.exports = router