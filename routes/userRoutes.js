const express = require('express');
const { register, login, getUsers, updatePreferences } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register); // Registro com username
router.post('/login', login);       // Login com username
router.get('/:idUser', authenticate, getUsers);
router.patch('/:id/preferences', authenticate, updatePreferences);

module.exports = router;