const db = require("../models/index.js");
const Prizes = db.prizes;
const CustomerPrizes = db.customerprizes;
const Score = db.score;

exports.getPrize = async (req, res) => {
  try {
    let data = await Prizes.findOne({ where: { id_prize: req.params.id } });
    if (!data) {
      return res.status(404).json({
        message: "This prize does not exist.",
      });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.buyPrize = async (req, res) => {
  try {
    let prize = await Prizes.findOne({ where: { id_prize: req.params.id } });

    if (!prize) {
      return res.status(404).json({
        message: "This prize does not exist.",
      });
    }

    let customerScore = await Score.findOne({
      where: { id_nif: req.params.nif },
    });

    if (!customerScore) {
      return res.status(404).json({
        message: "This customer does not exist.",
      });
    }
    if (customerScore <= prize.points) {
      return res.status(401).json({
        message: "This customer does not have enough points.",
      });
    }
    await CustomerPrizes.create({
      id_nif: req.params.nif,
      id_prize: req.params.id,
    }).then((data) => {
      return res.status(200).json({ message: "Prize bought successfully." });
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
