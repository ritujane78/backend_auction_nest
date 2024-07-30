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
const getUserBidsFromDB = (user_id, callback) => {
    const sql = `
        SELECT b.bid_id, b.item_id, b.bid_amount, b.bid_time, i.image, i.image_type, i.auction_start_time, i.auction_end_time, i.title
        FROM bids b
        JOIN items i ON b.item_id = i.item_id
        WHERE b.user_id = ? 
    `;
    pool.query(sql, [parseInt(user_id)], (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return callback(err);
        }
        const formattedResults = results.map(row => ({
            ...row,
            image: row.image ? row.image.toString('base64') : null
        }));
        callback(null, formattedResults);
    });
}
module.exports = { insertBid, getUserBidsFromDB };
