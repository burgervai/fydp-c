module.exports = (sequelize, DataTypes) => {
  return sequelize.define('PatientRecord', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    diagnosis: DataTypes.TEXT,
    notes: DataTypes.TEXT
  }, {
    tableName: 'patient_records',
    underscored: true
  });
};
