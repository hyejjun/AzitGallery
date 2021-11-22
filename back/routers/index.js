const express = require('express')
const router = express.Router()
const mainRouter = require('./main/index')
const userRouter = require('./user/index')
const mintRouter = require('./mint/index')
const shipRouter = require('./ship/index')
const itemRouter = require('./item/index')
const typeRouter = require('./type/index')
const viewRouter = require('./view/index')
const listRouter = require('./list/index')
const auctionRouter = require('./auction/index')
const dealRouter = require('./deal/index')
const likeRouter = require('./like/index')

router.use('/', mainRouter)
router.use('/user', userRouter)
router.use('/mint', mintRouter)
router.use('/ship',shipRouter)
router.use('/item',itemRouter)
router.use('/type',typeRouter)
router.use('/view',viewRouter)
router.use('/list',listRouter)
router.use('/auction',auctionRouter)
router.use('/deal',dealRouter)
router.use('/like',likeRouter)

module.exports = router