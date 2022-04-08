const express = require("express");
const router = express.Router();

const controller = require("../controller/prizes.controller");

const authController = require("../controller/auth.controller");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.route("/:id").get(authController.verifyToken, controller.getPrize);

router
  .route("/:id/:nif")
  .post(
    authController.verifyToken,
    authController.isLoggedUser,
    controller.buyPrize
  );

router.all("*", function (req, res) {
  res.status(404).json({ message: "Rota não definida." });
});

module.exports = router;
