const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
let config = {}

try {
  config = require('./config/database.js')
} catch(e) {
  console.log('INFO: Cannot find database.js file using, env files should be setup')
}

router.post('/register', (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg: 'Failed to register user'});
    }else{
      res.json({success: true, msg: 'Registered user success'});
    }
  });
});

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if(!user){
      return res.json({success: false, msg:'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toObject(), (process.env.SECRET || config.SECRET), {
            expiresIn: 604800
        });
        res.json({
          success: true,
          msg: 'Login Successful',
          token: 'JWT ' +token,
          user: {
            id: user._id,
            username: user.username
          }
        });
      } else {
        return res.json({success: false, msg:'Wrong password'});
      }
    });
  });
});

module.exports = router;
