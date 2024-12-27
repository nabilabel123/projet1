const express = require('express');
const app = express();
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');


// Middleware pour analyser les corps de requêtes JSON
app.use(express.json());

// Routes
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.use(bodyParser.json()); // Pour traiter le corps de la requête en JSON

// Exemple de route GET
app.get('/messages', (req, res) => {
  const { sender_id, recipient_id, date_from, date_to, status, limit, offset } = req.query;

  console.log('Received request:', req.query); // Affiche la requête dans la console du serveur
  
  // Crée une réponse contenant les données reçues
  const response = `
    <h1>Received Message Details</h1>
    <ul>
      <li>Sender ID: ${sender_id}</li>
      <li>Recipient ID: ${recipient_id}</li>
      <li>Date From: ${date_from}</li>
      <li>Date To: ${date_to}</li>
      <li>Status: ${status}</li>
      <li>Limit: ${limit}</li>
      <li>Offset: ${offset}</li>
    </ul>
  `;

  res.send(response); // Affiche les informations dans le navigateur
});






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});