const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const db = {};

db.User = require('./User')(sequelize, DataTypes);
db.Hospital = require('./hospital')(sequelize, DataTypes);
db.Doctor = require('./doctorModel')(sequelize, DataTypes);
db.Patient = require('./PatientModel')(sequelize, DataTypes);
db.Medicine = require('./medicineModel')(sequelize, DataTypes);
db.PatientRecord = require('./patientRecordModel')(sequelize, DataTypes);


/* ================== RELATIONSHIPS ================== */

// Hospital
db.Hospital.hasMany(db.Doctor);
db.Hospital.hasMany(db.Patient);

// User
db.User.hasOne(db.Doctor);
db.User.hasOne(db.Patient);

// Doctor & Patient
db.Doctor.belongsTo(db.User);
db.Patient.belongsTo(db.User);
db.Doctor.belongsTo(db.Hospital);
db.Patient.belongsTo(db.Hospital);

// Appointment
db.Doctor.hasMany(db.Appointment);
db.Patient.hasMany(db.Appointment);
db.Appointment.belongsTo(db.Doctor);
db.Appointment.belongsTo(db.Patient);

// Patient Records
db.Patient.hasMany(db.PatientRecord);
db.PatientRecord.belongsTo(db.Patient);

// Medicines
db.PatientRecord.hasMany(db.Medicine);
db.Medicine.belongsTo(db.PatientRecord);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
