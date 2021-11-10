const express = require('express')
const router = express.Router()
const controller = require('./type.controller')

router.post('/selltype', controller.get_selltype)
router.post('/category', controller.get_category)
router.post('/search', controller.get_search)
router.post('/sort', controller.get_sort)
router.post('/categorylist', controller.get_category_list)

module.exports = router