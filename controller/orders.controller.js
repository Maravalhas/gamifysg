const db = require("../models/index.js");
const Orders = db.orders;
const Customers = db.customers;

exports.getOrderById = async (req, res) => {
  try {
    let data = await Orders.findOne({ where: { id_order: req.params.id } });

    if (!data) {
      return res.status(404).json({ message: "Order Not Found!" });
    }
    data.products = JSON.parse(data.products);

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getOrderByCustomerNif = async (req, res) => {
  try {
    let customer = await Customers.findOne({
      where: { id_nif: req.params.nif },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer does not exist." });
    }

    let data = await Orders.findAll({ where: { id_nif: req.params.nif } });

    if (data == "") {
      return res.status(404).json({ message: "Customer has no orders yet." });
    }

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.registerOrder = async (req, res) => {
  try {
    await Orders.create({
      id_nif: req.body.nif,
      email: req.body.email,
      address: req.body.address,
      products: JSON.stringify(req.body.products),
      payment_method: req.body.payment_method,
      price: req.body.price,
      taxrate: req.body.taxrate,
      date: Date.now(),
      carrier: req.body.carrier,
      state: "Em Processamento",
    }).then((data) => {
      return res.status(201).json({ message: `Order registered successfully` });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
