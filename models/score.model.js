module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define("Score", {
    id_nif: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    points: { type: DataTypes.FLOAT, allowNull: false },
  });
  return Score;
};
