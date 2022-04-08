const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.status(200).json({ message: "SofiaGodinho API NODE.JS" });
});

app.use("/score", require("./router/score.router"));
app.use("/prizes", require("./router/prizes.router"));
app.use("/medals", require("./router/medals.router"));
app.use("/products", require("./router/products.router"));
app.use("/orders", require("./router/orders.router"));
app.use("/customers", require("./router/customers.router"));
app.use("/carts", require("./router/cart.router"));
app.use("/favourites", require("./router/favourites.router"));

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});
