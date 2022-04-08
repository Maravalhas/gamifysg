const express = require("express");
const router = express.Router();
const controller = require("../controller/customers.controller.js");

const authController = require("../controller/auth.controller");

router.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    //finish event is emitted once the response is sent to the client
    const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
    console.log(
      `${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`
    );
  });
  next();
});

router.route("/signup").post(authController.signup);

router.route("/signin").post(authController.signin);

router
  .route("/")
  .get(
    authController.verifyToken,
    authController.isLoggedUser,
    controller.getCustomerByEmail
  );

router
  .route("/:nif")
  .get(
    authController.verifyToken,
    authController.isLoggedUser,
    controller.getCustomerByNif
  )
  .put(
    authController.verifyToken,
    authController.isLoggedUser,
    controller.updateCustomer
  );

router.all("*", function (req, res) {
  res.status(404).json({ message: "Rota não definida." });
});

module.exports = router;
