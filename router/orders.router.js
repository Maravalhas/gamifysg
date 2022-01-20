const express = require('express')
const router = express.Router()
const controller = require('../controller/orders.controller.js')

router.route('/')
    .post(controller.registerOrder)

router.route('/:id')
    .get(controller.getOrderById)

router.route('/customer/:nif')
    .get(controller.getOrderByCustomerNif)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'Rota não definida.' });
})

module.exports = router;