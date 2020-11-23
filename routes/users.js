const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please inter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords does not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
    console.log(errors);
  } else {
    const user = await User.findOne({ email });

    if (user) {
      errors.push({ msg: 'Email already exists' });
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      console.log(newUser);

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          try {
            const user = await newUser.save();
            req.flash('success_msg', 'You are now registred and can log in');
            res.redirect('/users/login');
          } catch (err) {
            console.log(err);
          }
        });
      });
    }
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
