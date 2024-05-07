const express = require('express');
const router = express.Router();
const UserModel = require('../Model/Users');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const { email, orgName, orgId, password } = req.body;
    console.log(req.body)
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Account with this email already exists' });
    }

    const newUser = new UserModel({ email, orgName, orgId, password });
    const result = await newUser.save();
    const token = jwt.sign({ userId: result._id }, 'yourSecretKey');

    const data = { token, userInfo: result }; 
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
