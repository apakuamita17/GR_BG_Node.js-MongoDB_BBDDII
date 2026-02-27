const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  city:      { type: String, required: true },
  hasInternetAccess: { type: Boolean, default: true },
  deviceType: { type: String, enum: ['pc', 'laptop', 'tablet', 'phone', 'none'], default: 'phone' },
  riskLevel:  { type: String, enum: ['low', 'medium', 'high'], default: 'low' }
}, { timestamps: true });

module.exports = model('Student', studentSchema);
