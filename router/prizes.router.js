const express = require('express')
const router = express.Router()

const controller = require('../controller/prizes.controller')
const tools = require('../tool/validationtool')

router.route('/:id')
    .get(controller.getPrize)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'Tags: Route não definida.' });
})

module.exports = router;