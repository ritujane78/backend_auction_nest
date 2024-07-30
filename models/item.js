const pool = require('./db');

const insertItem = (image, imageType, title, description,starting_price, size, isDonated, category, auctionEndDateString, userId, callback) => {
  
  const createdAt = new Date();
  // const auctionStartDate = new Date(createdAt.getTime() + 2 * 24 * 60 * 60 * 1000);
  const auctionStartDate = new Date(createdAt.getTime());
  const auctionEndDate = new Date(auctionEndDateString);
  const sql = 'INSERT INTO items (user_id, title, description, starting_price, auction_start_time, auction_end_time, image, created_at, is_donated, image_type, size, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  pool.query(sql, [parseInt(userId), title, description, starting_price, auctionStartDate,auctionEndDate, image, createdAt, isDonated, imageType, size, category], callback);
};


const getAllItems = (callback) => {
  const sql = 'SELECT item_id, user_id, title, description, starting_price, final_price, winner_id, image, auction_start_time, auction_end_time, is_donated, image_type, size, current_price, category FROM items';
  pool.query(sql, callback);
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

module.exports = { insertItem, getAllItems, updateFinalPrice };