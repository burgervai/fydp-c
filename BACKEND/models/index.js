const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const db = {};

db.User = require("./User")(sequelize, DataTypes);
db.Hospital = require("./Hospital")(sequelize, DataTypes);
db.Doctor = require("./Doctor")(sequelize, DataTypes);
db.Patient = require("./Patient")(sequelize, DataTypes);
db.Appointment = require("./Appointment")(sequelize, DataTypes);
db.PatientRecord = require("./PatientRecord")(sequelize, DataTypes);
db.Medicine = require("./Medicine")(sequelize, DataTypes);
db.MedicineShop = require("./MedicineShop")(sequelize, DataTypes);


/* ================== RELATIONSHIPS ================== */

// Hospital
db.Hospital.hasMany(db.Doctor, { foreignKey: "hospital_id" });
db.Hospital.hasMany(db.Patient, { foreignKey: "hospital_id" });

// User
db.User.hasOne(db.Doctor, { foreignKey: "user_id" });
db.User.hasOne(db.Patient, { foreignKey: "user_id" });

// Doctor & Patient
db.Doctor.belongsTo(db.User, { foreignKey: "user_id" });
db.Patient.belongsTo(db.User, { foreignKey: "user_id" });

db.Doctor.belongsTo(db.Hospital, { foreignKey: "hospital_id" });
db.Patient.belongsTo(db.Hospital, { foreignKey: "hospital_id" });

// Appointment
db.Doctor.hasMany(db.Appointment, { foreignKey: "doctor_id" });
db.Patient.hasMany(db.Appointment, { foreignKey: "patient_id" });

db.Appointment.belongsTo(db.Doctor, { foreignKey: "doctor_id" });
db.Appointment.belongsTo(db.Patient, { foreignKey: "patient_id" });

// Patient Records
db.Patient.hasMany(db.PatientRecord, { foreignKey: "patient_id" });
db.PatientRecord.belongsTo(db.Patient, { foreignKey: "patient_id" });

// Medicines
db.PatientRecord.hasMany(db.Medicine, { foreignKey: "patient_record_id" });
db.Medicine.belongsTo(db.PatientRecord, { foreignKey: "patient_record_id" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
