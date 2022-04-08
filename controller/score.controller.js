const db = require("../models/index.js");
const Score = db.score;

exports.getCustomerScore = async (req, res) => {
  try {
    let data = await Score.findOne({ where: { id_nif: req.params.nif } });
    if (!data) {
      return res.status(404).json({
        message: "Customer does not exist.",
      });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateCustomerScore = async (req, res) => {
  try {
    let data = await Score.findOne({ where: { id_nif: req.params.nif } });
    if (!data) {
      return res.status(404).json({
        message: "Customer does not exist.",
      });
    }
    await Score.update(
      { points: data.points + req.body.points },
      { where: { id_nif: req.params.nif } }
    ).then((data) => {
      return res.status(201).json({
        data,
        message: "Customer score updated",
        location: "/score/" + req.params.nif,
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Some Error Occurred",
    });
  }
};
