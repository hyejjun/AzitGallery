const express = require('express')
const router = express.Router()
const controller = require('./item.controller')

router.get('/uploadpics', controller.upload_pics)

router.post('/getcategory', controller.get_category)



module.exports = router