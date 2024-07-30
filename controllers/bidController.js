const { insertBid, getUserBidsFromDB } = require('../models/bids');

const saveBid = (req, res) => {

const { user_id, item_id, bid_amount} = req.body


  insertBid( user_id,item_id, bid_amount, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.send('Bid recorded to database');
  });
};
const getUserBids = (req, res) => {
  const { user_id } = req.params;
  // console.log('User ID for bids:', user_id);

  getUserBidsFromDB(user_id, (err, result) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: err.message });
      }
      
      const bidsByItem = {};
      result.forEach(bid => {
          if (!bidsByItem[bid.item_id]) {
              bidsByItem[bid.item_id] = {
                  itemDetails: {
                      image: bid.image,
                      image_type: bid.image_type
                  },
                  bids: [],
                  auctionStart : bid.auction_start_time,
                  auctionEnd : bid.auction_end_time,
                  title: bid.title
              };
          }
          bidsByItem[bid.item_id].bids.push({
              bid_id: bid.bid_id,
              bid_amount: bid.bid_amount,
              bid_time: bid.bid_time
          });
      });

      // console.log('Bids by item:', bidsByItem);
      res.json(bidsByItem);
  });
}


module.exports = { saveBid, getUserBids };
