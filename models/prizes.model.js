module.exports = (sequelize, DataTypes) => {
  const Prize = sequelize.define("Prize", {
    id_prize: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    description: { type: DataTypes.STRING, allowNull: false },
    points: { type: DataTypes.FLOAT, allowNull: false },
  });
  return Prize;
};
