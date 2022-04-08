const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format("YYYY-MM-DD HH:mm:ss.SSS");
};

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

db.sequelize = sequelize;

db.cart = require("./cart.model.js")(sequelize, DataTypes);
db.customerprizes = require("./customerprizes.model.js")(sequelize, DataTypes);
db.customers = require("./customers.model.js")(sequelize, DataTypes);
db.favourites = require("./favourites.model.js")(sequelize, DataTypes);
db.medals = require("./medals.model.js")(sequelize, DataTypes);
db.orders = require("./orders.model.js")(sequelize, DataTypes);
db.prizes = require("./prizes.model.js")(sequelize, DataTypes);
db.score = require("./score.model.js")(sequelize, DataTypes);

module.exports = db;
