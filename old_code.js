const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 3000;

// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'auction_msc'
});

// Test the database connection
pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1); // Exit the process with an error code
    }
    console.log('Connected to the database.');
    connection.release();
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to handle signup
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  pool.query('SELECT COUNT(*) AS count FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (results[0].count > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Insert the user into the database
      pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.status(200).json({ message: 'Registered successfully!' });
      });
    });
  });
});

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to upload image
app.post('/upload', upload.single('image'), (req, res) => {
    const image = req.file.buffer;
    const imageType = req.file.mimetype;
    const title = req.body.title;
    const description = req.body.description;

    const sql = 'INSERT INTO images (image, image_type, title, description) VALUES (?, ?, ?, ?)';
    pool.query(sql, [image, imageType, title, description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.send('Image uploaded and saved to database');
    });
});

// Route to retrieve all images
app.get('/items', (req, res) => {
    const sql = 'SELECT id, image, image_type, title, description FROM items';
    pool.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const images = result.map(row => ({
            id: row.id,
            image: row.image.toString('base64'),
            type: row.image_type,
            title: row.title,
            description: row.description
        }));
        res.json(images);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
