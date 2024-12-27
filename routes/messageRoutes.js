const express = require('express');
const router = express.Router();
const { createMessage, getMessages, updateMessageStatus } = require('../controllers/messageController');

// Route pour envoyer un message
router.post('/', createMessage);

// Route pour récupérer les messages avec des filtres et pagination
router.get('/', getMessages);

// Route pour mettre à jour le statut d'un message
router.patch('/:id', updateMessageStatus);

module.exports = router;
