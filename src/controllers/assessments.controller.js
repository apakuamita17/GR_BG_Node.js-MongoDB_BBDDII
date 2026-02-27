const Assessment = require('../models/assessment.model');
const Course = require('../models/course.model');

exports.list = async (req, res) => {
  try {
    const assessments = await Assessment.find().populate({ path: 'course', select: 'title modality' });
    res.render('assessments/index', { title: 'Evaluaciones', assessments });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.showCreateForm = async (req, res) => {
  const courses = await Course.find({}, 'title');
  res.render('assessments/new', { title: 'Nueva Evaluación', courses });
};

exports.create = async (req, res) => {
  try {
    const { course, type, weight, modality, pandemicAdjustment, date } = req.body;
    await Assessment.create({ course, type, weight, modality, pandemicAdjustment: !!pandemicAdjustment, date });
    res.redirect('/assessments');
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) return res.status(404).send('No encontrado');
    const courses = await Course.find({}, 'title');
    res.render('assessments/edit', { title: 'Editar Evaluación', assessment, courses });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { course, type, weight, modality, pandemicAdjustment, date } = req.body;
    await Assessment.findByIdAndUpdate(
      req.params.id,
      { course, type, weight, modality, pandemicAdjustment: !!pandemicAdjustment, date },
      { new: true, runValidators: true }
    );
    res.redirect('/assessments');
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.remove = async (req, res) => {
  try {
    await Assessment.findByIdAndDelete(req.params.id);
    res.redirect('/assessments');
  } catch (e) {
    res.status(400).send(e.message);
  }
};
