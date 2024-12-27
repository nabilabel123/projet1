const express = require('express');
const app = express();
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');



app.use(express.json());


app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.use(bodyParser.json()); // Pour traiter le corps de la requête en JSON


app.get('/messages', (req, res) => {
  const { sender_id, recipient_id, date_from, date_to, status, limit, offset } = req.query;

  console.log('Received request:', req.query); 
  
  
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

  res.send(response); 
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
