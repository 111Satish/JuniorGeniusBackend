const express = require('express');
const router = express.Router();
const UserModel = require('../Model/Users');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email, password });
    if (!existingUser) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // const passwordMatch = await existingUser.comparePassword(password);
    // if (!passwordMatch) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }

    const token = jwt.sign({ userId: existingUser._id }, 'yourSecretKey');

    const data = { token, userInfo: existingUser }; 
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
