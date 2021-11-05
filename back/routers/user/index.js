const express = require('express')
const router = express.Router()
const controller = require('./user.controller')

router.post('/selleradmin', controller.seller_admin)


router.post('/signup',controller.signup_post)

router.post('/addressdbcheck',controller.address_db_check)

router.get('/userlist',controller.userlist_get)

router.post('/selleradminaccess',controller.selleradmin_access)

router.post('/selleradmindeny',controller.selleradmin_deny)

router.post('/selleradminwait',controller.selleradmin_wait)

module.exports = router