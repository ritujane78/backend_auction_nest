const pool = require('./db');

const insertNotification = (user_id, item_id, message, callback) => {
    const insertSql = 'INSERT INTO notifications (user_id, item_id, message) VALUES (?, ?, ?)';
    pool.query(insertSql, [user_id, item_id, message], (err, result) => {
        if (err) {
            console.error(`Error inserting notification for user_id: ${user_id}, item_id: ${item_id}`, err);
            return callback(err);
        }
        console.log(`Notification inserted for user_id: ${user_id}, item_id: ${item_id}`);
        callback(null, result);
    });
};

const getAllNotifications = (callback) => {
    const sql = 'SELECT * FROM notifications';
    pool.query(sql, (err, results) =>{
        if (err) {
            console.error('Query error:', err);
            return callback(err);
        }
        callback(null, results);
    })
} 


const insertWinnerAndUploaderNotifications = (item_id, winner_id, uploader_id, final_price, callback) => {
    const winnerMessage = `Congratulations! You won the auction for this item  with a final price of £${final_price}.`;
    const uploaderMessage = `Your item has been sold for a final price of £${final_price}.`;

    
    insertNotification(winner_id, item_id, winnerMessage, (err, result) => {
        if (err) {
            return callback(err); 
        }

        insertNotification(uploader_id, item_id, uploaderMessage, (err, result) => {
            if (err) {
                return callback(err); 
            }
            callback(null, result); 
        });
    });
};



module.exports ={insertNotification, getAllNotifications, insertWinnerAndUploaderNotifications};