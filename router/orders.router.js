const express = require("express");
const router = express.Router();
const controller = require("../controller/orders.controller.js");

const authController = require("../controller/auth.controller");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router
  .route("/")
  .post(
    authController.verifyToken,
    authController.isLoggedUser,
    controller.registerOrder
  );

router.route("/:id").get(controller.getOrderById);

router
  .route("/customer/:nif")
  .get(
    authController.verifyToken,
    authController.isLoggedUser,
    controller.getOrderByCustomerNif
  );

router.all("*", function (req, res) {
  res.status(404).json({ message: "Rota não definida." });
});

module.exports = router;
