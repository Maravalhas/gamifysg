const express = require('express')
const router = express.Router()
const controller = require('../controller/cart.controller.js')

router.route('/:nif')
    .put(controller.updateCart)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'Rota não definida.' });
})

module.exports = router;