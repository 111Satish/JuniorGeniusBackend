const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const router = express.Router();
const database = '../database.db';
const db = new sqlite3.Database(database);

// Create a users table if not exists
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)');
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Login endpoint
router.post('/', (req, res) => {
  const { email, password } = req.body;

  console.log(email)
  console.log(password)
  // Check if the user exists in the database
   db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (row) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

module.exports = router;
