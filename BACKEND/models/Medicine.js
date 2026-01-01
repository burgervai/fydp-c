module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Medicine",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      dosage: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      duration: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "medicines",
      underscored: true,
    }
  );
};
