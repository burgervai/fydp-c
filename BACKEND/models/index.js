const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// =====================
// Import Models (CASE-SAFE)
// =====================

const User = require('./User');
const userModel = require('./userModel');

const PatientModel = require('./PatientModel');
const PatientInfo = require('./PatientInfo');
const patientRecordModel = require('./patientRecordModel');

const Doctor = require('./doctorModel');
const Appointment = require('./appointmentModel');
const Feedback = require('./feedbackModel');

const Hospital = require('./hospital');
const Ward = require('./Ward');
const Room = require('./Room');
const BedAllocation = require('./BedAllocation');
const EmergencyCase = require('./EmergencyCase');

const Medicine = require('./medicineModel');
const MedicineShop = require('./medicineShop');
const InventoryItem = require('./InventoryItem');

// =====================
// Initialize Models
// =====================

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// User related
db.User = User(sequelize, Sequelize);
db.userModel = userModel(sequelize, Sequelize);

// Patient related
db.PatientModel = PatientModel(sequelize, Sequelize);
db.PatientInfo = Pati
