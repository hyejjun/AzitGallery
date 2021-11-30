const express = require('express')
const router = express.Router()
const controller = require('./ship.controller')

router.post('/shipinfo', controller.get_shipinfo)
router.post('/deliveryinfo', controller.get_delivery_info)
router.post('/orderdetail', controller.order_detail_post)

module.exports = router