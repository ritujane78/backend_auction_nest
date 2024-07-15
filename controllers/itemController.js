const multer = require('multer');
const { insertItem, getAllItems } = require('../models/item');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadItem = upload.single('image');

const saveItem = (req, res) => {
  const image = req.file.buffer;
  const imageType = req.file.mimetype;
    const { title, description, startingPrice, size, isDonated, userId } = req.body;

  insertItem(image, imageType, title, description, startingPrice, size, isDonated, userId, (err, result) => {
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
      image: row.image.toString('base64'),
      type: row.image_type,
      title: row.title,
      description: row.description,
      size: row.size,
      startingPrice: row.starting_price,
      currentPrice: row.current_price,
      isDonated : row.is_donated
    }));
    // console.log(items);
    res.json(items);
  });
};

module.exports = { uploadItem, saveItem, getItems };
