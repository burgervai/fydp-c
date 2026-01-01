module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Hospital",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      address: DataTypes.STRING,
      contact: DataTypes.STRING,
    },
    {
      tableName: "hospitals",
      underscored: true,
    }
  );
};
