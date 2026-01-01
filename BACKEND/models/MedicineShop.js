module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "MedicineShop",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      name: { type: DataTypes.STRING, allowNull: false },

      website: { type: DataTypes.STRING, allowNull: false },

      logo_url: { type: DataTypes.STRING },

      is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
    },
    {
      tableName: "medicine_shops",
      underscored: true
    }
  );
};
