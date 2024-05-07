const express = require('express');
const signUpRouter = require('./routes/signUp');
const loginRouter = require('./routes/login');
const cors = require('cors');
const dbConnection = require('./config'); 
const app = express();
const port = 3000;

dbConnection();

// app.use(cors({
//   origin: 'http:0.0.0.0',
//   credentials: true, 
// }));
app.use(cors());
app.use(express.json());

app.use('/signup', signUpRouter); 
app.use('/login', loginRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
