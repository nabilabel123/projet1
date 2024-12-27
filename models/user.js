const db = require('../config/db');

const User = {
  getAllUsers: (callback) => {
    db.query('SELECT * FROM users', callback);
  },
  getUserById: (id, name, role, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], name, role, callback);
  }
};

module.exports = User;
