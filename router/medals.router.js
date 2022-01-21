const express = require('express')
const router = express.Router()

const controller = require('../controller/medals.controller')

router.route('/:id')
    .get(controller.getMedal)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'Rota não definida.' });
})

module.exports = router;