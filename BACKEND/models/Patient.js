module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Patient",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      blood_group: DataTypes.STRING,

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
      tableName: "patients",
      underscored: true,
    }
  );
};
