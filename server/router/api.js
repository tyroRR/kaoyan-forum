const express = require('express');
const router = express.Router();
const User = require('../models/user');

let resData;
router.use((req,res,next)=> {
  resData = {
    code: 0,
    message: ''
  };
  next()
});

router.post(`/user/register`,(req,res,next)=>{
  const username = req.body.username;
  const password = req.body.password;
  const repassword = req.body.repassword;
  const role = req.body.role;

  if(!username){
    resData.code = 1;
    resData.message = `username can't be null`;
    res.json(resData);
    return;
  }

  if(!password){
    resData.code = 2;
    resData.message = `password can't be null`;
    res.json(resData);
    return;
  }

  if(password !== repassword){
    resData.code = 3;
    resData.message = 'entered passwords differ';
    res.json(resData);
    return;
  }

  User.findOne({
    username: username
  }).then(userInfo=>{
    if(userInfo){
      resData.code = 4;
      resData.message = 'username is registered';
      res.json(resData);
      return;
    }
    const user = new User({
      username:username,
      password:password
    });
    user.save();
  }).then(insertInfo =>{
    resData.message = 'registered successfully';
    res.json(resData);
  });

});

module.exports = router;
