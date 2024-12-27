const User = require('../models/user');

const getUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Échec de la récupération des utilisateurs' });
    }
    res.status(200).json(results);
  });
};

module.exports = { getUsers };
