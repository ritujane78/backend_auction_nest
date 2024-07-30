const multer = require('multer');
const { insertItem, getAllItems, updateFinalPrice } = require('../models/item');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadItem = upload.single('image');

const saveItem = (req, res) => {
  const image = req.file.buffer;
  const imageType = req.file.mimetype;
    const { title, description, startingPrice, size, isDonated, category, userId, auctionEndDate } = req.body;

  insertItem(image, imageType, title, description, startingPrice, size, isDonated, category, auctionEndDate, userId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Item uploaded successfully.'});
    
  });
};

const getItems = (req, res) => {
  getAllItems((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const items = result.map(row => ({
      id: row.item_id,
      user_id: row.user_id,
      category: row.category,
      image: row.image.toString('base64'),
      type: row.image_type,
      title: row.title,
      description: row.description,
      size: row.size,
      startingPrice: row.starting_price,
      currentPrice: row.current_price,
      isDonated : row.is_donated,
      auctionStart: row.auction_start_time,
      auctionEnd : row.auction_end_time,
      final_price : row.final_price,
      winner_id: row.winner_id
    }));
    // console.log(items);
    res.json(items);
  });
};


const updateFinalPrices = (req, res) => {
  updateFinalPrice((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Final prices updated successfully.', result });
  });
};

module.exports = { uploadItem, saveItem, getItems, updateFinalPrices };