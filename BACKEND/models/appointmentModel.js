module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Appointment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    appointment_date: { type: DataTypes.DATE, allowNull: false },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'completed'),
      defaultValue: 'pending'
    }
  }, {
    tableName: 'appointments',
    underscored: true
  });
};
