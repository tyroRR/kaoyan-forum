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
      password:password,
      role:"user"
    });
    user.save();
  }).then(insertInfo =>{
    resData.message = 'register successfully';
    res.json(resData);
  });

});

router.post(`/user/login`,(req,res,next) =>{
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  User.findOne({
    username: username,
    password: password
  }).then(userInfo=>{
    if(userInfo){
      const userInfo = {
        username: username,
        role: userInfo.role
      };
      resData.code = 0;
      resData.message = 'login successfully';
      resData.userInfo = userInfo;
      return res.json(resData)
    }else {
      resData.code = 1;
      resData.message = 'the user was not found';
      res.json(resData)
    }
  })
});

module.exports = router;
