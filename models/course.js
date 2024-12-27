const db = require('../config/db');

const Course = {
  getAllCourses: (callback) => {
    db.query('SELECT * FROM courses', callback);
  }
};

module.exports = Course;
