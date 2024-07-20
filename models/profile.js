const pool = require('./db');

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
const getUploadsDB = (user_id, callback) => {
    const sql = 'SELECT * FROM items WHERE user_id = ?';
    pool.query(sql, [parseInt(user_id)], (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return callback(err);
        }
        callback(null, results);
    });
}

const getUserBidsFromDB = (user_id, callback) => {
    const sql = `
        SELECT b.bid_id, b.item_id, b.bid_amount, b.bid_time, i.image, i.image_type
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

const getWonBidsFromDB = (user_id, callback) => {
    const sql = `
        SELECT b.bid_id, b.item_id, b.bid_amount, b.bid_time, i.image, i.image_type
        FROM bids b
        JOIN items i ON b.item_id = i.item_id and i.final_price = b.bid_amount
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
module.exports = { getUserInfo, getUploadsDB, getUserBidsFromDB, getWonBidsFromDB };
