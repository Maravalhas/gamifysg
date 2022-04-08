const url = "https://design.sofiagodinho.com/api/products";
const key = require("../config/db.config").key;
const convert = require("xml-js");
const axios = require("axios");

exports.getProducts = async (req, res) => {
  try {
    let data = await axios.get(url + "?" + key);

    if (!data) {
      return res.status(404).json({ message: "There are no products" });
    }

    data = JSON.parse(
      convert.xml2json(data.data, {
        compact: true,
        ignoreComment: true,
        spaces: 4,
      })
    );

    let productLinks = [];

    data.prestashop.products.product.forEach((obj) => {
      productLinks.push(obj._attributes.id);
    });

    return res.status(200).json(productLinks);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    let data = await axios.get(url + `/${req.params.id}?` + key);

    if (!data) {
      return res.status(404).json({ message: "Product does not exist!" });
    }

    data = JSON.parse(
      convert.xml2json(data.data, {
        compact: true,
        ignoreComment: true,
        spaces: 4,
      })
    );

    data = data.prestashop.product;

    const stocks = data.associations.stock_availables.stock_available;

    let finalStock = [];

    try {
      for (const obj of stocks) {
        const link = obj._attributes["xlink:href"];
        let req = await axios.get(link + "?" + key);
        req = JSON.parse(
          convert.xml2json(req.data, {
            compact: true,
            ignoreComment: true,
            spaces: 4,
          })
        );
        let stock = req.prestashop.stock_available.quantity._cdata;
        finalStock.push(stock);
      }
    } catch {
      finalStock = stocks;
    }

    let images = [];

    if (
      data.associations.images.image &&
      data.associations.images.image.length > 1
    ) {
      data.associations.images.image.forEach((obj) => {
        images.push(obj._attributes["xlink:href"]);
      });
    } else if (data.associations.images.image) {
      images.push(data.associations.images.image._attributes["xlink:href"]);
    } else {
      images.push("Product Image not Found");
    }

    return res.status(200).json({
      id: data.id._cdata,
      name: data.name.language[0]._cdata,
      category: data.id_category_default._cdata,
      description: data.description_short.language[0]._cdata,
      price: data.price._cdata,
      stock: finalStock,
      imageLink: images,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const limit = req.body.limit ? req.body.limit : 10;
    const offset = req.body.offset ? req.body.offset : 0;

    let data = await axios.get(
      url +
        `/?filter[id_category_default]=${req.params.id}&limit=${offset},${limit}&` +
        key
    );

    if (!data) {
      return res
        .status(404)
        .json({ message: "There are no products in this category" });
    }

    data = JSON.parse(
      convert.xml2json(data.data, {
        compact: true,
        ignoreComment: true,
        spaces: 4,
      })
    );

    data = data.prestashop.products.product;

    let produtos = [];

    try {
      for (const obj of data) {
        const objUrl = obj._attributes["xlink:href"];
        let prod = await axios.get(objUrl + "?" + key);
        prod = JSON.parse(
          convert.xml2json(prod.data, {
            compact: true,
            ignoreComment: true,
            spaces: 4,
          })
        );
        prod = prod.prestashop.product;

        let inStock = false;
        const stocks = prod.associations.stock_availables.stock_available;

        try {
          for (const obj of stocks) {
            if (!inStock) {
              const link = obj._attributes["xlink:href"];
              let req = await axios.get(link + "?" + key);
              req = JSON.parse(
                convert.xml2json(req.data, {
                  compact: true,
                  ignoreComment: true,
                  spaces: 4,
                })
              );
              if (req.prestashop.stock_available.quantity._cdata != 0) {
                inStock = true;
              }
            }
          }
        } catch {
          inStock = false;
        }

        let image;

        try {
          image = prod.associations.images.image[0]._attributes["xlink:href"];
        } catch {
          try {
            image = prod.associations.images.image._attributes["xlink:href"];
          } catch {
            image = "Product image not found";
          }
        }

        produtos.push({
          id: prod.id._cdata,
          name: prod.name.language[1]._cdata,
          price: prod.price._cdata,
          image: image,
          inStock: inStock,
        });
      }
    } catch (err) {
      produtos = "Nenhum resultado encontrado";
    }
    return res.status(200).json(produtos);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getProductsByName = async (req, res) => {
  try {
    let limit = req.body.limit ? req.body.limit : 10;
    let offset = req.body.offset ? req.body.offset : 0;

    let data = await axios.get(
      url +
        `/?filter[name]=%[${req.params.text}]%&limit=${offset},${limit}&` +
        key
    );

    if (!data) {
      return res
        .status(404)
        .json({ message: "There are no products with this name" });
    }
    data = JSON.parse(
      convert.xml2json(data.data, {
        compact: true,
        ignoreComment: true,
        spaces: 4,
      })
    );
    data = data.prestashop.products.product;

    let produtos = [];

    try {
      for (const obj of data) {
        let objUrl = obj._attributes["xlink:href"];
        let prod = await axios.get(objUrl + "?" + key);
        prod = JSON.parse(
          convert.xml2json(prod.data, {
            compact: true,
            ignoreComment: true,
            spaces: 4,
          })
        );
        prod = prod.prestashop.product;

        let inStock = false;

        let stocks = prod.associations.stock_availables.stock_available;

        try {
          if (!inStock) {
            for (const obj of stocks) {
              let link = obj._attributes["xlink:href"];
              let req = await axios.get(link + "?" + key);
              req = JSON.parse(
                convert.xml2json(req.data, {
                  compact: true,
                  ignoreComment: true,
                  spaces: 4,
                })
              );
              if (req.prestashop.stock_available.quantity._cdata != 0) {
                inStock = true;
              }
            }
          }
        } catch {
          inStock = false;
        }

        let image;

        try {
          image = prod.associations.images.image[0]._attributes["xlink:href"];
        } catch {
          try {
            image = prod.associations.images.image._attributes["xlink:href"];
          } catch {
            image = "";
          }
        }

        produtos.push({
          id: prod.id._cdata,
          name: prod.name.language[1]._cdata,
          price: prod.price._cdata,
          image: image,
          inStock: inStock,
        });
      }
    } catch (err) {
      produtos = "Nenhum resultado encontrado";
    }
    return res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    let data = await axios.get(
      "https://design.sofiagodinho.com/api/categories?" + key
    );
    if (!data) {
      return res.status(404).json({ message: "There are no categories!" });
    }
    data = JSON.parse(
      convert.xml2json(data.data, {
        compact: true,
        ignoreComment: true,
        spaces: 4,
      })
    );
    data = data.prestashop.categories.category;

    let categories = [];

    for (const obj of data) {
      let link = obj._attributes["xlink:href"];
      let req = await axios.get(link + "?" + key);
      req = JSON.parse(
        convert.xml2json(req.data, {
          compact: true,
          ignoreComment: true,
          spaces: 4,
        })
      );
      let category = {
        id: req.prestashop.category.id._cdata,
        name: req.prestashop.category.name.language[0]._cdata,
      };
      categories.push(category);
    }

    return res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
