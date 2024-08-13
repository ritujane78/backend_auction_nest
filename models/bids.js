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
// const getUserBidsFromDB = (user_id, callback) => {
//     const sql = `
//         SELECT b.bid_id, b.item_id, b.bid_amount, b.bid_time, i.image, i.image_type, i.auction_start_time, i.auction_end_time, i.brandName,i.category, i.current_price,i.starting_price, i.gender, i.description, i.size, i.final_price, i.bidder_id
//         FROM bids b
//         JOIN items i ON b.item_id = i.item_id
//         WHERE b.user_id = ? 
//     `;
//     pool.query(sql, [parseInt(user_id)], (err, results) => {
//         if (err) {
//             console.error('Query error:', err);
//             return callback(err);
//         }
//         const formattedResults = results.map(row => ({
//             ...row,
//             image: row.image ? row.image.toString('base64') : null
//         }));
//         callback(null, formattedResults);
//     });
// }

const getUserBidsFromDB = (user_id, callback) => {
    const sql = `
        SELECT 
            b.bid_id, 
            b.item_id, 
            b.bid_amount, 
            b.bid_time, 
            i.image, 
            i.image_type, 
            i.auction_start_time, 
            i.auction_end_time, 
            i.brandName,
            i.category, 
            i.current_price,
            i.starting_price, 
            i.gender, 
            i.description, 
            i.size, 
            i.final_price, 
            i.bidder_id,
            i.winner_id,
            COUNT(b2.bid_id) AS bid_count -- Count of all bids on the item
        FROM 
            bids b
        JOIN 
            items i ON b.item_id = i.item_id
        LEFT JOIN 
            bids b2 ON i.item_id = b2.item_id
        WHERE 
            b.user_id = ?
        GROUP BY 
            b.bid_id, 
            b.item_id, 
            b.bid_amount, 
            b.bid_time, 
            i.image, 
            i.image_type, 
            i.auction_start_time, 
            i.auction_end_time, 
            i.brandName,
            i.category, 
            i.current_price,
            i.starting_price, 
            i.gender, 
            i.description, 
            i.size, 
            i.final_price, 
            i.bidder_id,
            i.winner_id
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
const getBidHistory = (item_id, callback) => {
    const sql = `
        SELECT 
            u.user_id,
            u.username,
            u.full_name, 
            u.email, 
            b.bid_id, 
            b.item_id, 
            b.bid_amount, 
            b.bid_time
        FROM 
            users u
        JOIN 
            bids b ON u.user_id = b.user_id AND b.item_id = ?
        WHERE 
            b.item_id IS NULL OR b.item_id = ?;
    `;
    pool.query(sql, [parseInt(item_id), parseInt(item_id)], (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return callback(err);
        }
        callback(null, results);
    });
}


module.exports = { insertBid, getUserBidsFromDB, getBidHistory };
