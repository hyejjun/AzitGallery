const express = require('express')
const router = express.Router()
const controller = require('./ship.controller')

router.post('/shipinfo', controller.get_shipinfo)
router.get('/sendshipinfo', controller.send_shipinfo)
router.post('/deliveryinfo', controller.get_deliveryinfo)


module.exports = router