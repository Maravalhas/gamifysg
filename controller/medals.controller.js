const db = require("../models/index.js");
const Medals = db.medals;
const CustomerMedals = db.customermedals;

exports.getMedal = async (req, res) => {
  try {
    let medal = await Medals.findOne({ where: { id_medal: req.params.id } });

    if (!medal) {
      return res.status(404).json({
        message: "This medal does not exist.",
      });
    }

    return res.status(200).json(medal);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.associateMedal = async (req, res) => {
  try {
    let medal = await Medals.findOne({
      where: { id_medal: req.body.id_medal },
    });

    if (!medal) {
      return res.status(404).json({
        message: "This medal does not exist.",
      });
    }

    await CustomerMedals.create({
      id_nif: req.params.nif,
      id_medal: req.params.id,
    }).then((data) => {
      return res
        .status(200)
        .json({ message: "Medal associated successfully." });
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
