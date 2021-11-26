const express = require('express')
const router = express.Router()
const controller = require('./type.controller')

router.post('/selltype', controller.get_selltype)
router.post('/category', controller.get_category)
router.post('/search', controller.get_search)
router.post('/sort', controller.get_sort)
router.post('/categorylist', controller.get_category_list)
router.post('/subcategorylist', controller.get_sub_category_list)

router.get('/categorys',controller.get_categorys)
router.post('/sub',controller.get_sub_category)
router.post('/allitem',controller.all_list_direct_get)


module.exports = router