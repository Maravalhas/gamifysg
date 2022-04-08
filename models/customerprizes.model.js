module.exports = (sequelize, DataTypes) => {
  const CustomerPrizes = sequelize.define("CustomerPrize", {
    id_prize: { type: DataTypes.INTEGER, allowNull: false },
    id_nif: { type: DataTypes.INTEGER, allowNull: false },
  });
  return CustomerPrizes;
};
