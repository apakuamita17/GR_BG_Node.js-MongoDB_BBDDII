const { Schema, model, Types } = require('mongoose');

const courseSchema = new Schema({
  title:     { type: String, required: true },
  modality:  { type: String, enum: ['online', 'hybrid', 'in-person'], required: true },
  semester:  { type: String, required: true },
  instructor: { type: Types.ObjectId, ref: 'Instructor', required: true }
}, { timestamps: true });

module.exports = model('Course', courseSchema);
