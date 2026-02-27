const router = require('express').Router();
const Submission = require('../models/submission.model');

router.post('/', async (req, res) => { try { res.status(201).json(await Submission.create(req.body)); } catch (e) { res.status(400).json({ error: e.message }); }});
router.get('/', async (req, res) => { try { res.json(await Submission.find().populate('assessment').populate('student')); } catch (e) { res.status(500).json({ error: e.message }); }});
router.get('/:id', async (req, res) => { try { const d = await Submission.findById(req.params.id).populate('assessment').populate('student'); if(!d) return res.status(404).json({error:'No encontrado'}); res.json(d);} catch(e){res.status(400).json({error:e.message});}});
router.put('/:id', async (req, res) => { try { const d = await Submission.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true}); if(!d) return res.status(404).json({error:'No encontrado'}); res.json(d);} catch(e){res.status(400).json({error:e.message});}});
router.delete('/:id', async (req, res) => { try { const d = await Submission.findByIdAndDelete(req.params.id); if(!d) return res.status(404).json({error:'No encontrado'}); res.json({ok:true, message:'Eliminado'});} catch(e){res.status(400).json({error:e.message});}});

module.exports = router;
