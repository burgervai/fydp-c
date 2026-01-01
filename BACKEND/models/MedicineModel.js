module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Medicine', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    dosage: DataTypes.STRING,
    duration: DataTypes.STRING
  }, {
    tableName: 'medicines',
    underscored: true
  });
};
