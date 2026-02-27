const { Schema, model } = require('mongoose');

const instructorSchema = new Schema({
  name:        { type: String, required: true },
  department:  { type: String, required: true },
  email:       { type: String, required: true, unique: true },
  experienceYears: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = model('Instructor', instructorSchema);
