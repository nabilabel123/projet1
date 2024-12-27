const Message = require('../models/message');

// Création d'un message
const createMessage = async (req, res) => {

  const { sender_id, recipient_id, content, course_id, status } = req.body;
  try {
    await Message.createMessage(sender_id, recipient_id, content, course_id, status);
    res.status(201).json({ message: 'Message envoyé avec succès' });
  } catch (err) {
    console.error('Error creating message:', err);
    res.status(500).json({ error: 'Échec de l\'envoi du message' });
  }
};

// Récupération des messages avec filtrage et pagination
const getMessages = async (req, res) =>  {
  console.log("Received request:", req.query); // Ajoutez cette ligne pour voir les paramètres dans la console du serveur
  
  const { sender_id, recipient_id, date_from, date_to, status, limit = 10, offset = 0 } = req.query;
  
  const limitInt = parseInt(limit, 10);
  const offsetInt = parseInt(offset, 10);
  try {
    const results = await Message.getMessages(sender_id, recipient_id, date_from, date_to, status, limitInt, offsetInt);
    res.status(200).json(results);
    if (isNaN(limitInt) || isNaN(offsetInt)) {
      return res.status(400).json({ error: 'Les paramètres de pagination doivent être des nombres' });
    }
  } catch (err) {
    console.error('Error retrieving messages:', err);
    res.status(500).json({ error: 'Échec de la récupération des messages' });
  }

};


// Mise à jour du statut d'un message
const updateMessageStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Input validation
  if (!id || !status) {
    return res.status(400).json({
      error: 'ID et status sont requis'
    });
  }

  try {
    // Add logging to debug the input values
    console.log('Attempting to update message:', { id, status });

    const result = await Message.updateStatus(id, status);

    // Check if update was successful
    if (!result || result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Message non trouvé ou aucune mise à jour effectuée'
      });
    }

    console.log('Update result:', result);

    res.status(200).json({
      message: 'Statut du message mis à jour',
      result
    });
  } catch (err) {
    console.error('Error updating message status:', err);
    res.status(500).json({
      error: 'Échec de la mise à jour du statut',
      details: err.message
    });
  }
};

module.exports = { createMessage, getMessages, updateMessageStatus };
