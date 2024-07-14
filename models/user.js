const pool = require('./db');


const getUserByUsername = (username, callback) => {
  pool.query('SELECT * FROM users WHERE username = ?', [username], callback);
};

// const getCurrentUser = ()

const insertUser = (username, hashedPassword, email, fullName, address, phoneNumber, createdAt, updatedAt, callback) => {
  pool.query(
    'INSERT INTO users (username, password, email, full_name, address, phone_number, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [username, hashedPassword, email, fullName, address, phoneNumber, createdAt, updatedAt], 
    callback
  );
};

module.exports = { getUserByUsername, insertUser };
