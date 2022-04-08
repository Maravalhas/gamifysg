const db = require("../models/index.js");
const Cart = db.cart;

exports.getCart = async (req, res) => {
  try {
    const data = await Cart.findOne({ where: { id_nif: req.params.nif } });

    if (!data) {
      res.status(404).json({
        message: "Customer does not exist.",
      });
    } else {
      res.status(201).json(data);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const data = await Cart.findOne({ where: { id_nif: req.params.nif } });

    if (!data) {
      res.status(404).json({
        message: "Customer does not exist.",
      });
    } else {
      Cart.update(
        {
          id_products: req.body.products,
          products_quantity: req.body.quantity,
        },
        { where: { id_nif: req.params.nif } }
      ).then(() => {
        res.status(200).json({ message: "Customer cart updated" });
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
