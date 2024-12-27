const db = require('../config/db');

const Message = {
 
  createMessage: (sender_id, recipient_id, content, course_id, status) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO messages (sender_id, recipient_id, content, course_id, status)
        VALUES (?, ?, ?, ?, ?)
      `;
      db.query(query, [sender_id, recipient_id, content, course_id, status.trim()], (err, result) => {
        if (err) {
          console.error('Error creating message:', err);
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  
  getMessages: (sender_id, recipient_id, date_from, date_to, status) => {
    return new Promise((resolve, reject) => {
      let query = `
        SELECT * FROM messages
        WHERE (sender_id = ? OR recipient_id = ?)
      `;
      const params = [sender_id, recipient_id];

    
      if (date_from && date_to) {
        query += ` AND sent_at BETWEEN ? AND ?`;
        params.push(date_from, date_to);
      }
      if (status) {
        query += ` AND status = ?`;
        params.push(status);
      }

      db.query(query, params, (err, results) => {
        if (err) {
          console.error('Error retrieving messages:', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  },

updateStatus: async (id, status) => {
  try {
  
    const query = 'UPDATE messages SET status = ? WHERE id = ?';

    return new Promise((resolve, reject) => {
      db.query(query, [status.trim(), id], (err, result) => {
        if (err) {
          console.error('Error updating message status:', err);
          reject(err);
          return;
        }

        if (result.affectedRows === 0) {
          reject(new Error('Message not found'));
          return;
        }

        resolve(result);
      });
    });
  } catch (error) {
    console.error('Failed to update message status:', error);
    throw error;
  }
}
};

module.exports = Message;
