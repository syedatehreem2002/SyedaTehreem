const express = require('express');
const router = express.Router();
const User = require('../models/user');


//api/users Get
router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
// POST /api/users  new user
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    try {
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (err) {
      console.error('Failed to create user:', err);
      res.status(500).json({ error: 'Failed to create user' });
    }
  });
//run this on browser the api will be shown  http://localhost:3000/users
module.exports = router;
