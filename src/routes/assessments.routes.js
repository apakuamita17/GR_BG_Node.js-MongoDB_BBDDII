const router = require('express').Router();
const Assessment = require('../models/assessment.model');

// Create
router.post('/', async (req, res) => {
  try {
    const doc = await Assessment.create(req.body);
    res.status(201).json(doc);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const docs = await Assessment.find().populate({ path: 'course', select: 'title modality' });
    res.json(docs);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const doc = await Assessment.findById(req.params.id).populate('course');
    if (!doc) return res.status(404).json({ error: 'No encontrado' });
    res.json(doc);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const doc = await Assessment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ error: 'No encontrado' });
    res.json(doc);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const doc = await Assessment.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'No encontrado' });
    res.json({ ok: true, message: 'Eliminado' });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// Consulta sencilla: por modalidad
router.get('/search/by-modality', async (req, res) => {
  const { modality = 'online' } = req.query;
  try {
    const docs = await Assessment.find({ modality });
    res.json(docs);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

module.exports = router;
