const pool = require('./db');

const insertBid = (user_id, item_id, bid_amount,callback) => {
    const sql = 'INSERT INTO bids_test (user_id, item_id, bid_amount) VALUES (?, ?, ?)';
  pool.query(sql, [user_id,item_id,bid_amount], callback);
};

// const getAllItems = (callback) => {
//   const sql = 'SELECT id, image, image_type, title, description FROM images';
//   pool.query(sql, callback);
// };

module.exports = { insertBid };