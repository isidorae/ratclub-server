const express = require('express');
const router = express.Router()
// const itemRouter = require('./items.router')
const categoryRouter = require('./category.router')
const itemsRouter = require('./items.router')
const usersRouter = require('./user.router')
const ordersRouter = require('./orders.router')

// router.use('/products', itemRouter)
router.use('/categories', categoryRouter)
router.use('/products', itemsRouter)
router.use('/users', usersRouter)
router.use('/user', ordersRouter)

module.exports = router; 