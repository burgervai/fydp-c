module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Doctor",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      specialization: DataTypes.STRING,
      license_number: { type: DataTypes.STRING, unique: true },

      // Explicit Foreign Keys
      hospital_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "hospitals", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      tableName: "doctors",
      underscored: true,
    }
  );
};
