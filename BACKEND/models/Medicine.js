module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Medicine",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      dosage: DataTypes.STRING,
      duration: DataTypes.STRING,

      // Explicit Foreign Key
      patient_record_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "patient_records", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "medicines",
      underscored: true,
    }
  );
};
