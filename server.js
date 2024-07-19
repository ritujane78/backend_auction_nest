const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cron = require('node-cron');
const axios = require('axios');

const app = express();
const port = 3000;
const userRouter = require('./routers/userRouter');
const itemRouter = require('./routers/itemRouter');
const bidRouter = require('./routers/bidRouter');

// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('public'));

// Use routers
app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/bid', bidRouter);


cron.schedule('*/10 * * * *', async () => {
  try {
    await axios.post('http://localhost:3000/item/updateFinalPrices');
    console.log('Final prices updated successfully.');
  } catch (error) {
    console.error('Error updating final prices:', error);
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
