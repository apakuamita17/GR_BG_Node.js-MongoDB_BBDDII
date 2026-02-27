const { Schema, model, Types } = require('mongoose');

const submissionSchema = new Schema({
  assessment:  { type: Types.ObjectId, ref: 'Assessment', required: true },
  student:     { type: Types.ObjectId, ref: 'Student', required: true },
  score:       { type: Number, min: 0, max: 100, required: true },
  status:      { type: String, enum: ['on-time', 'late', 'missing'], default: 'on-time' },
  submittedAt: { type: Date, default: Date.now },
  comments:    { type: String }
}, { timestamps: true });

module.exports = model('Submission', submissionSchema);
