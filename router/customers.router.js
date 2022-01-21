const express = require('express')
const router = express.Router()
const controller = require('../controller/customers.controller.js')

router.route('/')
    .post(controller.register)

router.route('/signin')
    .post(controller.login)

router.route('/:nif')
    .get(controller.getCustomerByNif)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'Rota não definida.' });
})

module.exports = router;