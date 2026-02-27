const router = require('express').Router();
const ctrl = require('../controllers/assessments.controller');

router.get('/', ctrl.list);
router.get('/new', ctrl.showCreateForm);
router.post('/', ctrl.create);
router.get('/:id/edit', ctrl.showEditForm);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
