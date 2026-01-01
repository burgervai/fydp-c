module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "PatientRecord",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      diagnosis: DataTypes.TEXT,
      notes: DataTypes.TEXT,

      // Explicit Foreign Key
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "patients", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "patient_records",
      underscored: true,
    }
  );
};
