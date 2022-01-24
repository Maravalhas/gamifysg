const express = require('express')
const router = express.Router()
const controller = require('../controller/favourites.controller.js')

router.route('/:nif')
    .put(controller.updateFavourites)
    .get(controller.getFavourites)
    .post(controller.createFavourite)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'Rota não definida.' });
})

module.exports = router;