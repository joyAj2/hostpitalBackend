// models/Vitals.js

const mongoose = require('mongoose');

const vitalsSchema = new mongoose.Schema({
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  bloodPressure: {
    systolic: {
      type: Number,
      required: true,
    },
    diastolic: {
      type: Number,
      required: true,
    },
  },
  temperature: {
    type: Number,
    required: true,
  },
  pulse: {
    type: Number,
    required: true,
  },
  spO2: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Vitals = mongoose.model('Vitals', vitalsSchema);

module.exports = Vitals;
