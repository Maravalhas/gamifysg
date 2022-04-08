module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    id_nif: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: true },
    birthday: { type: DataTypes.DATE, allowNull: true },
  });
  return Customer;
};
