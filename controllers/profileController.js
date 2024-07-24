const { getUserInfo,getUploadsDB, getUserBidsFromDB, getWonBidsFromDB } = require("../models/profile");

const getUser = (req, res) => {
    const { user_id } = req.params;
    // console.log('User ID:', user_id);

    getUserInfo(user_id, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        const userInfo = result.map(row => ({
            name: row.full_name,
            username: row.username,
            email: row.email,
            address : row.address,
            phone: row.phone_number
        }));
        // console.log('User Info:', userInfo);
        res.json(userInfo[0]);
    });
}
const getUploads = (req, res) => {
    const { user_id } = req.params;
    // console.log(user_id);

    getUploadsDB(user_id, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }

        const uploads = result.map(item => ({
            item_id: item.item_id,
            category: item.category,
            auctionEnd : item.auction_end_time,
            isDonated : item.is_donated,
            description: item.description,
            image: item.image ? item.image.toString('base64') : null,
            image_type: item.image_type
        }));
        res.json(uploads);
    });
}

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
                    auctionEnd : bid.auction_end_time
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

const getUserWins = (req, res) => {
    const { user_id } = req.params;
    // console.log('User ID for wins:', user_id);

    getWonBidsFromDB(user_id, (err, result) => {
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
                    bid_amount : bid.bid_amount,
                    bid_time : bid.bid_time
                };
            }
        });

        // console.log('Won', bidsByItem);
        res.json(bidsByItem);
    });
}

module.exports = { getUser, getUploads, getUserBids, getUserWins };