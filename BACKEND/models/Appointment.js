module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Appointment",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      appointment_date: { type: DataTypes.DATE, allowNull: false },
      status: {
        type: DataTypes.ENUM("pending", "confirmed", "completed", "cancelled"),
        defaultValue: "pending",
      },
      notes: DataTypes.TEXT,

      // Explicit Foreign Keys
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "doctors", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "patients", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      tableName: "appointments",
      underscored: true,
    }
  );
};
