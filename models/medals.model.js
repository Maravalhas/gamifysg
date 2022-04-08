module.exports = (sequelize, DataTypes) => {
  const Medal = sequelize.define("Medal", {
    id_medal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    description: { type: DataTypes.STRING, allowNull: false },
    points: { type: DataTypes.FLOAT, allowNull: false },
  });
  return Medal;
};
