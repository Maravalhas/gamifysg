const express = require('express')
const router = express.Router()

const controller = require('../controller/score.controller')
const tools = require('../tool/validationtool')

router.route('/:nif')
    .get(controller.getCustomerScore)
    .put(controller.updateCustomerScore)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'Rota não definida.' });
})

module.exports = router;