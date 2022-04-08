module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id_order: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    id_nif: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    products: { type: DataTypes.STRING, allowNull: false },
    payment_method: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    taxrate: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    carrier: { type: DataTypes.STRING, allowNull: false },
    tracking: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: false },
  });
  return Order;
};
