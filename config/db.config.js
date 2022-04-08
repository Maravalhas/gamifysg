require("dotenv").config();

const config = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  key: process.env.KEY,
  pool: {
    max: 10, //maximum number of connections in pool
    min: 0, //minimum number of connections in pool
    acquire: 30000, //maximum time (ms), that pool will try to get connection before throwing error
    idle: 10000, //maximum time (ms) that a connection can be idle before being released
  },
};

module.exports = config;
