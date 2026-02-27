const router = require('express').Router();
const Student = require('../models/student.model');

router.post('/', async (req, res) => { try { res.status(201).json(await Student.create(req.body)); } catch (e) { res.status(400).json({ error: e.message }); }});
router.get('/', async (req, res) => { try { res.json(await Student.find()); } catch (e) { res.status(500).json({ error: e.message }); }});
router.get('/:id', async (req, res) => { try { const d = await Student.findById(req.params.id); if(!d) return res.status(404).json({error:'No encontrado'}); res.json(d);} catch(e){res.status(400).json({error:e.message});}});
router.put('/:id', async (req, res) => { try { const d = await Student.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true}); if(!d) return res.status(404).json({error:'No encontrado'}); res.json(d);} catch(e){res.status(400).json({error:e.message});}});
router.delete('/:id', async (req, res) => { try { const d = await Student.findByIdAndDelete(req.params.id); if(!d) return res.status(404).json({error:'No encontrado'}); res.json({ok:true, message:'Eliminado'});} catch(e){res.status(400).json({error:e.message});}});

module.exports = router;
