module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define("Favourite", {
    id_nif: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
  });
  return Favourite;
};
