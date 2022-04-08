module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    id_nif: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    id_products: { type: DataTypes.STRING, allowNull: true },
    products_quantity: { type: DataTypes.STRING, allowNull: true },
  });
  return Cart;
};
