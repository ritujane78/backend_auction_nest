const { insertBid } = require('../models/bids');

const saveBid = (req, res) => {

const { user_id, item_id, bid_amount} = req.body


  insertBid( user_id,item_id, bid_amount, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.send('Bid recorded to database');
  });
};


module.exports = { saveBid };
