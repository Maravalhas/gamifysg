const express = require("express");
const router = express.Router();

const controller = require("../controller/score.controller");

const authController = require("../controller/auth.controller");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router
  .route("/:nif")
  .get(
    authController.verifyToken,
    authController.isLoggedUser,
    controller.getCustomerScore
  )
  .put(
    authController.verifyToken,
    authController.isLoggedUser,
    controller.updateCustomerScore
  );

router.all("*", function (req, res) {
  res.status(404).json({ message: "Rota não definida." });
});

module.exports = router;
