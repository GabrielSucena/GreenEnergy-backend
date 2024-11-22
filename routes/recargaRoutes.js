const express = require('express');
const { getRecargas, createRecarga } = require('../controllers/recargaController');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.get('/:idUser', authenticate, getRecargas);
router.post('/', authenticate, createRecarga);

module.exports = router;