const bcrypt = require('bcryptjs');
const { getUserByUsername, insertUser } = require('../models/user');

const signup = (req, res) => {
  console.log(req.body);
  const { username, password, email, fullName, address, phoneNumber, createdAt, updatedAt } = req.body;

  getUserByUsername(username, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results[0].count > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      insertUser(username, hashedPassword, email, fullName, address, phoneNumber, createdAt, updatedAt, (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.status(200).json({ message: 'Registered successfully!' });
      });
    });
  });
};

module.exports = { signup };
