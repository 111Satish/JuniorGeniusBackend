const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const signUpRouter = require('./routes/signUp');
const loginRouter = require('./routes/login');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/signUp', signUpRouter);
app.use('/login', loginRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
