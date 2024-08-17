const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const axios = require('axios');

const app = express();
const port = 3001;
const userRouter = require('./routers/userRouter');
const itemRouter = require('./routers/itemRouter');
const bidRouter = require('./routers/bidRouter');


// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Use routers
app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/bid', bidRouter);


cron.schedule('*/10 * * * *', async () => {
  try {
    await axios.post('http://localhost:3001/item/updateFinalPrices');
    console.log('Final updates successfully done in the database.');
  } catch (error) {
    console.error('Error updating final data to the database', error);
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
