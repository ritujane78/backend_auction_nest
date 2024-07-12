const pool = require('./db');

const insertItem = (image, imageType, title, description, callback) => {
  const sql = 'INSERT INTO images (image, image_type, title, description) VALUES (?, ?, ?, ?)';
  pool.query(sql, [image, imageType, title, description], callback);
};

const getAllItems = (callback) => {
  const sql = 'SELECT id, image, image_type, title, description FROM images';
  pool.query(sql, callback);
};

module.exports = { insertItem, getAllItems };
