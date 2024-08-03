const pool = require('./db');

const insertItem = (image, imageType, brandName, description,starting_price, size, gender, isDonated, category, auctionEndDate, userId, callback) => {
  
  const createdAt = new Date();
  const auctionStartDate = new Date(createdAt.getTime());
  const sql = 'INSERT INTO items (user_id, brandName, description, starting_price, auction_start_time, auction_end_time, image, created_at, is_donated, image_type, size, gender, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  pool.query(sql, [parseInt(userId), brandName, description, starting_price, auctionStartDate,auctionEndDate, image, createdAt, isDonated, imageType, size, gender, category], callback);
};


const getAllItems = (callback) => {
  const sql = 'SELECT item_id, user_id, brandName, description, gender, starting_price, final_price, winner_id, image, auction_start_time, auction_end_time, is_donated, image_type, size, current_price, category, isEmailSent FROM items';
  pool.query(sql, callback);
};

const updateItemEmailStatus = (item_id, isEmailSent, callback) => {
  const sql = 'UPDATE items SET isEmailSent = ? WHERE item_id = ?';
  pool.query(sql, [isEmailSent, item_id], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

const updateFinalPrice = (callback) => {
  const sql = `
    UPDATE items 
    SET final_price = current_price,
    winner_id = bidder_id
    WHERE auction_end_time < NOW() AND current_price IS NOT NULL AND final_price IS NULL AND winner_id IS NULL
  `;
  pool.query(sql, callback);
};

module.exports = { insertItem, getAllItems, updateItemEmailStatus, updateFinalPrice };