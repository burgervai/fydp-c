const { Sequelize } = require('sequelize');
const { centralSequelize, getHospitalSequelize } = require('../config/database');

// Central DB container
const db = {
  Sequelize,
  sequelize: centralSequelize
};

// Helper to init models
const initModel = (sequelize, model) => {
  if (typeof model === 'function') {
    return model(sequelize, Sequelize);
  }
  return model;
};

// Central models
const centralModels = {
  User: require('./User'),
  AuditLog: require('./AuditLog'),
  Hospital: require('./Hospital')
};

// Init central models
Object.entries(centralModels).forEach(([name, model]) => {
  db[name] = initModel(centralSequelize, model);
});

// Setup associations
Object.values(db).forEach((model) => {
  if (model?.associate) model.associate(db);
});

// Hospital models setup
const setupHospitalModels = require('./hospital');

// Get hospital DB
const getHospitalDb = async (hospitalId) => {
  const id = Number(hospitalId);
  const normalizedId = id >= 1 && id <= 5 ? id : 1;

  const sequelize = getHospitalSequelize(normalizedId);

  await sequelize.query('CREATE SCHEMA IF NOT EXISTS hospital_schema');

  const models = setupHospitalModels(sequelize, Sequelize);

  Object.values(models).forEach((model) => {
    if (model?.associate) model.associate(models);
  });

  return { sequelize, models };
};

db.getHospitalDb = getHospitalDb;

// Sync databases
db.syncDatabase = async ({ force = false, alter = false } = {}) => {
  console.log('🔧 Syncing central database...');
  await centralSequelize.sync({ force, alter });

  let hospitals = [];
  try {
    hospitals = await db.Hospital.findAll();
  } catch {
    hospitals = [{ id: 1 }];
  }

  for (const h of hospitals) {
    const { sequelize } = await getHospitalDb(h.id);
    await sequelize.sync({ force, alter });
  }

  console.log('✅ Database sync complete');
};

// Close connections
db.closeConnections = async () => {
  await centralSequelize.close();
  console.log('🔌 DB connection closed');
};

module.exports = db;
