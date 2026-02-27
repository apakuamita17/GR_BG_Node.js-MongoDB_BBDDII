const { Schema, model, Types } = require('mongoose');

const assessmentSchema = new Schema({
  course:   { type: Types.ObjectId, ref: 'Course', required: true },
  type:     { type: String, enum: ['exam', 'project', 'quiz', 'presentation'], required: true },
  weight:   { type: Number, min: 0, max: 100, required: true },
  modality: { type: String, enum: ['online', 'in-person'], required: true },
  pandemicAdjustment: { type: Boolean, default: true },
  date:     { type: Date, required: true }
}, { timestamps: true });

module.exports = model('Assessment', assessmentSchema);
