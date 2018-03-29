const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Topic = require('../models/Topic');
const Info = require('../models/Info');

let resData;
router.use((req,res,next)=> {
  resData = {
    code: 0,
    message: ''
  };
  next()
});

router.post(`/user/*`,(req,res,next)=>{
  console.log(req.cookies);
  if(req.cookies.accessToken){
    next();
  }
  return res.json({
    code: 1,
    message: 'no access'
  })
});

router.post(`/register`,(req,res)=>{
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
      avatar:"../uploads/avatar.jpeg",
      role:"user",
    });
    user.save().then(() =>{
      resData.message = 'register successfully';
      res.json(resData);
    })
  })
});

router.post(`/login`,(req,res) =>{
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({
    username: username,
    password: password
  }).then(user=>{
      const role = user.role;
      const accessToken = user.id;
      const userInfo = {
        id: user.id,
        username: username,
        avatar: user.avatar,
        role: role,
      };
      resData.code = 0;
      resData.message = 'login successfully';
      resData.userInfo = userInfo;
      res.cookie('accessToken',accessToken,{ httpOnly: true});
      return res.json(resData)
    })
    .catch(err=>{
    resData.code = 1;
    resData.message = 'the user was not found';
    res.json(resData)
  })
});

router.get(`/logout`,(req,res) =>{
  res.clearCookie('accessToken');
  resData.code = 0;
  resData.message = 'logout successfully';
  res.json(resData)
});

router.post(`user/updateProfile`,(req,res) =>{
  if(req.username){
    const username = req.username;
  }
  if(req.password){
    const password = req.password;
  }
  if(req.avatar){
    const avatar = req.avatar;
  }

});

router.post(`/admin/postInfo`,(req,res) =>{
  const createTime = new Date().toLocaleString();
  const info = new Info({
    title : req.body.title,
    content : req.body.content,
    sponsor : "admin",
    avatar : req.body.avatar,
    createTime : createTime
  });
  info.save();
  resData.code = 1;
  resData.message = 'success';
  res.json(resData)
});

router.get(`/getInfoList`,(req,res) =>{
  Info.find().then(doc=> {
    resData = doc;
    res.send(resData)
  }).catch(err=>{
    resData.message = 1;
    resData.message = `failed`;
    console.log(err);
    res.json(resData);
  });
});

router.get(`/getTopicList`,(req,res) =>{
  Topic.find().then(doc=> {
    resData = doc;
    res.send(resData)
  }).catch(err=>{
    resData.message = 1;
    resData.message = `failed`;
    console.log(err);
    res.json(resData);
  });
});

router.post(`/user/:id/postTopic`,(req,res) =>{
  const createTime = new Date().toLocaleString();
  const topic = new Topic({
    title : req.body.title,
    content : req.body.content,
    sponsor : req.body.sponsor,
    avatar : req.body.avatar,
    type : 'recent',
    createTime : createTime
  });
  topic.save();
  resData.code = 1;
  resData.message = 'success';
  res.json(resData)
});



module.exports = router;
