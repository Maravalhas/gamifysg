const db = require("../models/index.js");
const Customers = db.customers;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secret = process.env.SECRET;

exports.signin = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(403).json({ message: "Email is mandatory" });
    }

    if (!req.body.password) {
      return res.status(403).json({ message: "Password is mandatory" });
    }

    let passwordIsValid;

    const customer = await Customers.findOne({
      where: { email: req.body.email },
      raw: true,
    });

    if (!customer) {
      return res.status(404).json({
        message: "User Does not Exist",
      });
    }

    passwordIsValid = bcrypt.compareSync(req.body.password, customer.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Wrong Credentials!",
      });
    }

    const token = jwt.sign({ user: customer.id_nif }, secret, {});

    return res.status(200).json({
      id_nif: customer.id_nif,
      accessToken: token,
      message: "Login sucesss!",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    let data = await Customers.findOne({ where: { id_nif: req.body.nif } });

    if (data) {
      return res.status(403).json({ message: "User already exists!" });
    }

    let created = false;

    await Customers.create({
      id_nif: req.body.nif,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      gender: req.body.gender,
      birthday: req.body.birthday,
    }).then((data) => {
      created = true;
    });
    if (created) {
      await Score.create({
        id_nif: data.id_nif,
        points: 0,
      });

      await Cart.create({
        id_nif: data.id_nif,
      });

      return res.status(201).json({ message: "New customer created." });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    token = token.substring(7, token.length);

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Token is not valid!" });
      }
      req.user = decoded.user;
      next();
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.isLoggedUser = async (req, res, next) => {
  try {
    if (req.user != req.params.nif) {
      return res
        .status(401)
        .json({ message: "You're not authorized to do this request" });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
