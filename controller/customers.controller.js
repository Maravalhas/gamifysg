const db = require("../models/index.js");
const Customers = db.customers;

const bcrypt = require("bcrypt");

exports.getCustomerByNif = async (req, res) => {
  try {
    let data = await Customers.findOne({ where: { id_nif: req.params.nif } });

    if (!data) {
      return res.status(404).json({
        message:
          err.message || `Customer with nif ${req.params.nif} does not exist!`,
      });
    }
    return res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getCustomerByEmail = async (req, res) => {
  try {
    let data = await Customers.findOne({ where: { email: req.query.email } });

    if (!data) {
      return res.status(404).json({
        message:
          err.message ||
          `Customer with email ${req.params.email} does not exist!`,
      });
    }
    return res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    let data = await Customers.findOne({ where: { id_nif: req.params.nif } });
    if (!data) {
      return res.status(404).json({
        message: "Customer does not exist.",
      });
    }
    await Customers.update(
      {
        id_nif: req.body.nif,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        gender: req.body.gender,
      },
      {
        where: {
          id_nif: req.params.nif,
        },
      }
    ).then((data) => {
      return res.status(201).json({
        data,
        message: "Customer updated",
        location: "/customer/" + req.params.nif,
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Some Error Occurred",
    });
  }
};
