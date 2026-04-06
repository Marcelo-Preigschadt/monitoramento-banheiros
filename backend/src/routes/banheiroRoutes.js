const express = require('express');
const router = express.Router();
const controller = require('../controllers/banheiroController');

router.get('/banheiros', controller.getAll);
router.post('/uso', controller.uso);
router.post('/limpeza', controller.limpeza);

module.exports = router;
