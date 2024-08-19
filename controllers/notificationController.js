const {insertNotification, getAllNotifications} = require('../models/notification');

const saveNotification = (req, res) => {
    const { user_id, item_id, message } = req.body;

    insertNotification(user_id, item_id,message, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.send('Notification added to database');
    });
  };

  const allNotifications = (req, res) => {
  
    getAllNotifications( (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
  }
  module.exports = {saveNotification, allNotifications};