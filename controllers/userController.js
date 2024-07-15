const bcrypt = require('bcryptjs');
const { getUserByUsername, insertUser } = require('../models/user');

const signup = (req, res) => {
  const { username, password, email, fullName, address, phoneNumber, createdAt, updatedAt } = req.body;

  getUserByUsername(username, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
  

    if (results[0]?.count > 0) {
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
const signin = (req, res) => {
  const { username, password } = req.body;

  getUserByUsername(username, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }
      const expirationTime = new Date().getTime() + (60 * 60 * 1000); // 1 hour from now

      res.status(200).json({ message: 'Logged in successfully', userId: user.user_id, expirationTime });
    });
  });
};

module.exports = { signup, signin };
