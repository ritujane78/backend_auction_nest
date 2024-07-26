const pool = require('./db');

const insertBid = (user_id, item_id, bid_amount, callback) => {
    const insertBidSql = 'INSERT INTO bids (user_id, item_id, bid_amount) VALUES (?, ?, ?)';
    pool.query(insertBidSql, [user_id, item_id, bid_amount], (err, result) => {
        if (err) {
            return callback(err);
        }
        
        // Update the current price in the items table
        const updatePriceSql = `
            UPDATE items
            SET current_price = (SELECT MAX(bid_amount) FROM bids WHERE item_id = ?),
            bidder_id = ?
            WHERE item_id = ?;
        `;
        pool.query(updatePriceSql, [item_id,user_id, item_id], (updateErr, updateResult) => {
            if (updateErr) {
                return callback(updateErr);
            }
            callback(null, updateResult);
        });
    });
};

module.exports = { insertBid };
