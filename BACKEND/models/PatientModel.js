module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Patient', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    blood_group: DataTypes.STRING
  }, {
    tableName: 'patients',
    underscored: true
  });
};
