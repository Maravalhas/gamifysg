const { Sequelize, Model, DataTypes } = require('sequelize'); 
const config = require('../config/db.config')
const sequelize = new Sequelize.Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST, 
    dialect: 'mysql'
})

// MODEL PONTUACAO

class Score extends Model {}

Score.init({
    id_nif: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, unique:true},
    points: {type: DataTypes.FLOAT, allowNull: false}
}, { sequelize, modelName: 'Score'})

// MODEL Rewards

class Prizes extends Model {}

Prizes.init({
    id_prize: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, unique:true},
    description: {type: DataTypes.STRING, allowNull: false},
    points: {type:DataTypes.FLOAT, allowNull: false}
}, { sequelize, modelName: 'Prize'})

class CustomerPrizes extends Model {}

CustomerPrizes.init({
    id_prize: {type: DataTypes.INTEGER, allowNull: false},
    id_nif: {type: DataTypes.INTEGER, allowNull: false},
}, { sequelize, modelName: 'CustomerPrize'})

// MODEL Medals

class Medals extends Model {}

Medals.init({
    id_medal: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, unique:true},
    description: {type: DataTypes.STRING, allowNull: false},
    points: {type:DataTypes.FLOAT, allowNull: false}
}, { sequelize, modelName: 'Medal'})

class CustomerMedals extends Model {}

CustomerMedals.init({
    id_medal: {type: DataTypes.INTEGER, allowNull: false},
    id_nif: {type: DataTypes.INTEGER, allowNull: false},
}, { sequelize, modelName: 'CustomerMedal'})


// MODEL Users

class Customers extends Model{}

Customers.init({
    id_nif : {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, unique:true},
    firstname : {type: DataTypes.STRING, allowNull: false},
    lastname : {type: DataTypes.STRING, allowNull: false},
    email : {type: DataTypes.STRING, allowNull: false, unique:true},
    password : {type: DataTypes.STRING, allowNull: false},
    gender : {type: DataTypes.STRING, allowNull: false}, 
    birthday : {type: DataTypes.DATE, allowNull: false}
}, { sequelize, modelName: 'Customer'})

sequelize.sync().then().catch(error => {
    console.log(error); 
})

class Cart extends Model{}

Cart.init({
    id_nif: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, unique:true},
    id_products: {type: DataTypes.STRING,allowNull: true},
    products_quantity:{type:DataTypes.STRING,allowNull:true}
},{ sequelize, modelName: 'Cart'})

exports.Score = Score
exports.Prizes = Prizes
exports.CustomerPrizes = CustomerPrizes
exports.Medals = Medals
exports.CustomerMedals = CustomerMedals
exports.Customers = Customers
exports.Cart = Cart