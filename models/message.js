const db = require('../config/db');

const Message = {
  // Create a message
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

  // Get messages with filters
  getMessages: (sender_id, recipient_id, date_from, date_to, status) => {
    return new Promise((resolve, reject) => {
      let query = `
        SELECT * FROM messages
        WHERE (sender_id = ? OR recipient_id = ?)
      `;
      const params = [sender_id, recipient_id];

      // Add filters dynamically
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

  // Update message status
 // In your Message model
updateStatus: async (id, status) => {
  try {
    // Remove COALESCE/IFNULL and make it a direct update
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
