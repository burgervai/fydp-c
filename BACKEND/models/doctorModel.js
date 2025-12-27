module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Doctor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    specialization: DataTypes.STRING,
    license_number: { type: DataTypes.STRING, unique: true }
  }, {
    tableName: 'doctors',
    underscored: true
  });
};
