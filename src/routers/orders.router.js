const express = require('express')
const router = express.Router()
const {createOrder, getOrders, getOrder} = require('../controllers/orders.controller')
const auth = require('../middlewares/validateToken')


router.post('/order', auth, createOrder);
router.post('/orders', auth, getOrders);
router.get('/order/:id', auth, getOrder);

module.exports = router;