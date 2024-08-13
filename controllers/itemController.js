const multer = require('multer');
const nodemailer = require('nodemailer');
const { insertItem, getAllItems, updateFinalPrice } = require('../models/item');
const { getUserInternal } = require('./userController');
const { updateItemEmailStatus } = require('../models/item');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadItem = upload.single('image');

const saveItem = (req, res) => {
  const image = req.file.buffer;
  const imageType = req.file.mimetype;
  const { brandName, description, startingPrice, size, gender, isDonated, category, userId, auctionEndDate, title } = req.body;

  insertItem(image, imageType, brandName, description, startingPrice, size, gender, isDonated, category, auctionEndDate, title, userId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Item uploaded successfully.' });
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
      brandName: row.brandName,
      description: row.description,
      gender: row.gender,
      size: row.size,
      startingPrice: row.starting_price,
      currentPrice: row.current_price,
      isDonated: row.is_donated,
      auctionStart: row.auction_start_time,
      auctionEnd: row.auction_end_time,
      final_price: row.final_price,
      winner_id: row.winner_id,
      title: row.title,
      bidder_id: row.bidder_id,
      bid_count: row.bid_count
    }));
    res.json(items);
  });
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "ritujane78@gmail.com",
    pass: "yyfv xwyg sqrn joiy",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = async (recipientEmail, subject, textMessage, htmlMessage) => {
  const mailOptions = {
    from: {
      name: "Auction Nest",
      address: "ritujane78@gmail.com"
    },
    to: recipientEmail, 
    subject: subject, 
    // text: textMessage, 
    html: htmlMessage, 
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email has been sent to " + recipientEmail);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

const updateIsEmailSent = (item_id, isEmailSent, callback) => {
  updateItemEmailStatus(item_id, isEmailSent, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return callback(err);
    }
    callback(null, result);
  });
};

const updateFinalPrices = (req, res) => {
  updateFinalPrice((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    getAllItems((err, items) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      items.forEach(item => {
        if (new Date(item.auction_end_time) < new Date() && item.final_price && item.winner_id && !item.isEmailSent) {
          getUserInternal(item.winner_id, (errUser, user) => {
            if (errUser) {
              return res.status(500).json({ error: errUser.message });
            }

            const winnerEmail = user.email;

            sendMail(
              winnerEmail,
              'Congratulations!',
              `You won the auction for ${item.brandName}. Your final price is £${item.final_price}.`,
              `<p>Congratulations! You won the auction for <b>${item.brandName} ${item.category} </b>. </p> <p>Your final price is <b>£${item.final_price}</b>.</p>`
            );


          });
          getUserInternal(item.user_id, (errUser, user) => {
            if (errUser) {
              return res.status(500).json({ error: errUser.message });
            }

            const userEmail = user.email;

            sendMail(
              userEmail,
              'Auction Ended!',
              `The auction for your item ${item.brandName} ${item.category} has ended. The final price is £${item.final_price}`,
              `<p> The auction for your item ${item.brandName} ${item.category} has ended.</p><p>The final price is <b>£${item.final_price}</b>.</p>`
            );
          });
          updateIsEmailSent(item.item_id, true, (errUpdate) => {
            if (errUpdate) {
              console.error('Error updating isEmailSent:', errUpdate);
            }
          });
        }
      });
    });

    res.status(200).json({ message: 'Final updates successfully done.', result });
  });
};





module.exports = { uploadItem, saveItem, getItems, updateFinalPrices };
