const express = require('express');
// const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();
// const Customer = require('../models/Customer');
const { ensureAuthenticated } = require('../config/auth');

router.get('/', async (req, res) => {
  res.render('welcome');
});

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  res.render('dashboard', {
    name: req.user.name,
  });
});

module.exports = router;
