
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const middleware = require('./middleware');
const express = require('express');
const router = express.Router();
const User = require('../../models/User');


router.post('/register', (req, res) => {
    User.create(req.body)
      .then(user => res.json({ msg: 'User added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to create new user' }));
  });


  router.post('/login', (req,res) => {
    const { email, password } = req.body;
    console.log(email,password);
    if(!email || !password){
        res.status(400).json({msg: 'Please enter all fields'});
    }
    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({msg: 'User does not exist'});

             // create a token using user name and password vaild for 2 hours
            let token_payload = {name: user.name,email:user.email, password: user.password};
            let token = jwt.sign(token_payload, "jwt_secret_password", { expiresIn: '2h' });
            let response = { message: 'Token Created, Authentication Successful!', token: token,
            user:{
                  id:user._id,name: user.name,email:user.email, password: user.password
                } };

          // return the information including token as JSON
          return res.status(200).json(response);
         
    })
  });
  module.exports = router;

    /* User.findOne(req.params.email)
        .then(user => res.json({ msg: 'User added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to create new user' })); */

        /*
        else {
          return res.status("409").json("Authentication failed. admin not found.");*/

  