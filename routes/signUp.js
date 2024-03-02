const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const router = express.Router();
const database = '../database.db';
const db = new sqlite3.Database(database);

// Create a users table if not exists
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, orgName TEXT, orgId TEXT, password TEXT)');
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
  const { email, orgName, orgId, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (row) {
      return res.status(400).json({ error: 'Email already registered' });
    } else {
    
      db.run('INSERT INTO users (email, orgName, orgId, password) VALUES (?, ?, ?, ?)', [email, orgName, orgId, password], (err) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(201).json({ message: 'Signup successful' });
      });
    }
  });
});

module.exports = router;