const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');

// Route pour récupérer tous les utilisateurs
router.get('/', getUsers);

module.exports = router;
