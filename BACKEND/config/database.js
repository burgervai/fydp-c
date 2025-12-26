const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Cache for hospital DB connections
const hospitalConnections = {};

// Central database URL (Neon)
const centralDatabaseUrl =
  process.env.DATABASE_URL || process.env.NEON_DATABASE;

if (!centralDatabaseUrl) {
  throw new Error(
    '❌ Central database URL is missing. Set DATABASE_URL or NEON_DATABASE in Render.'
  );
}

// ✅ SINGLE Sequelize instance (VERY IMPORTANT)
const centralSequelize = new Sequelize(centralDatabaseUrl, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Factory for hospital DBs
const createHospitalConnection = (hospitalDbUrl) => {
  return new Sequelize(hospitalDbUrl, {
    dialect: 'postgres',
    logging: false
  });
};

// Get hospital-specific Sequelize
const getHospitalSequelize = (hospitalId) => {
  const validIds = [1, 2, 3, 4, 5];
  const id = Number(hospitalId);

  if (!validIds.includes(id)) {
    throw new Error(`Invalid hospital ID: ${hospitalId}`);
  }

  if (!hospitalConnections[id]) {
    const envVar = `DATABASE_URL_HOSPITAL${id}`;
    hospitalConnections[id] = process.env[envVar]
      ? createHospitalConnection(process.env[envVar])
      : centralSequelize;
  }

  return hospitalConnections[id];
};

module.exports = {
  centralSequelize,
  getHospitalSequelize
};
