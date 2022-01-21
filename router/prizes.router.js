const express = require('express')
const router = express.Router()

const controller = require('../controller/prizes.controller')

router.route('/:id')
    .get(controller.getPrize)

router.route('/:id/:nif')
    .post(controller.buyPrize)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'Rota não definida.' });
})

module.exports = router;