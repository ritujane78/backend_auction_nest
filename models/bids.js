const pool = require('./db');

const insertBid = (user_id, item_id, bid_amount,callback) => {
    const sql = 'INSERT INTO bids (user_id, item_id, bid_amount) VALUES (?, ?, ?)';
  pool.query(sql, [user_id,item_id,bid_amount], callback);
};


module.exports = { insertBid };