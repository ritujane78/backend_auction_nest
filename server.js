const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = 3000;
const userRouter = require('./routers/userRouter');
const itemRouter = require('./routers/itemRouter');
const bidRouter = require('./routers/bidRouter')

// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('public'));

// Use routers
app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/bid', bidRouter);
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
