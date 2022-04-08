const db = require("../models/index.js");
const Favourites = db.favourites;

exports.getFavourites = async (req, res) => {
  try {
    const data = await Favourites.findOne({
      where: { id_nif: req.params.nif },
    });

    if (!data) {
      return res.status(404).json({
        message: "Customer does not exist.",
      });
    }
    return res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFavourites = async (req, res) => {
  try {
    const data = await Favourites.findOne({
      where: { id_nif: req.params.nif },
    });

    if (!data) {
      return res.status(404).json({
        message: "Customer does not exist.",
      });
    }

    await Favourites.update(
      {
        id_products: req.body.products,
      },
      { where: { id_nif: req.params.nif } }
    ).then(() => {
      return res.status(200).json({ message: "Customer favourites updated" });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createFavourite = async (req, res) => {
  try {
    let data = await Favourites.findOne({ where: { id_nif: req.body.nif } });

    if (data) {
      return res.status(500).json({
        message: "Favourite Already Exists.",
      });
    }
    await Favourites.create({
      id_nif: req.body.nif,
      name: req.body.name,
      price: req.body.price,
      img: req.body.img,
    }).then((data) => {
      return res.status(201).json({ message: "New favourite created." });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
