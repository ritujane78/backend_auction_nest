const pool = require('./db');


const getUserByUsername = (username, callback) => {
  pool.query('SELECT * FROM users WHERE username = ?', [username], callback);
};

const insertUser = (username, hashedPassword, email, fullName, address, phoneNumber, createdAt, updatedAt, callback) => {
  pool.query(
    'INSERT INTO users (username, password, email, full_name, address, phone_number, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [username, hashedPassword, email, fullName, address, phoneNumber, createdAt, updatedAt], 
    callback
  );
};

const getUserInfo = (user_id, callback) => {
  const sql = 'SELECT * FROM users WHERE user_id = ? LIMIT 1';
  pool.query(sql, [parseInt(user_id)], (err, results) => {
      if (err) {
          console.error('Query error:', err);
          return callback(err);
      }
      callback(null, results);
  });
}

const getUserEmail = (user_id, callback) => {
  const sql = 'SELECT email FROM users WHERE user_id = ? LIMIT 1';
  pool.query(sql, [parseInt(user_id)], (err, results) => {
      if (err) {
          console.error('Query error:', err);
          return callback(err);
      }
      callback(null, results);
  });
}



module.exports = { getUserByUsername, insertUser, getUserInfo, getUserEmail };
