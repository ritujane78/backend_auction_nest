const multer = require('multer');
const { insertItem, getAllItems } = require('../models/item');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadItem = upload.single('image');

const saveItem = (req, res) => {
  const image = req.file.buffer;
  const imageType = req.file.mimetype;
  const { title, description } = req.body;

  insertItem(image, imageType, title, description, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.send('Item uploaded and saved to database');
  });
};

const getItems = (req, res) => {
  getAllItems((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const items = result.map(row => ({
      id: row.id,
      image: row.image.toString('base64'),
      type: row.image_type,
      title: row.title,
      description: row.description
    }));
    res.json(items);
  });
};

module.exports = { uploadItem, saveItem, getItems };
