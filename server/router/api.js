const express = require('express');
const upload = require('../utils/multerUtil');
const router = express.Router();
const User = require('../models/User');
const Topic = require('../models/Topic');
const Lesson = require('../models/Lesson');
const Info = require('../models/Info');
const Document = require('../models/Document');

let resData;
router.use((req,res,next)=> {
  resData = {
    code: 0,
    message: ''
  };
  next()
});

// router.all(`/user/*`,(req,res,next)=>{
//   console.log(req.cookies);
//   if(req.cookies.accessToken){
//     next();
//   }
//   return res.json({
//     code: 1,
//     message: 'no access'
//   })
// });

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
    .catch(()=>{
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

router.get(`/admin/getUserList`,(req,res) =>{
  User.find().then(doc=> {
    resData = doc;
    res.send(resData)
  }).catch(err=>{
    resData.message = 1;
    resData.message = `failed`;
    console.log(err);
    res.json(resData);
  });
});

router.put(`/admin/createUser`,(req,res) =>{
  const username = req.body.username;
  const password = req.body.password;
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

  User.findOne({
    username: username
  }).then(userInfo=>{
    if(userInfo){
      resData.code = 4;
      resData.message = 'username is exist';
      res.json(resData);
      return;
    }
    const user = new User({
      username:username,
      password:password,
      avatar:"../uploads/avatar.jpeg",
      role:role,
    });
    user.save().then(() =>{
      resData.message = 'create successfully';
      res.json(resData);
    })
  })
});

router.patch(`/admin/updateUserInfo/:uid`,(req,res) =>{
  const uid = req.params.uid;
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  User.findOne({
    username: username
  }).then(userInfo=> {
    if (userInfo) {
      resData.code = 4;
      resData.message = 'username is exist';
      res.json(resData);
      return;
    }
    User.findByIdAndUpdate(uid, {
      username: username,
      password: password,
      role: role
    }).then(()=>{
        resData.code = 0;
        resData.message = 'success';
        res.send(resData)
      }
    ).catch(()=>{
      resData.code = 1;
      resData.message = 'failed';
      res.send(resData)
    })
  })
});

router.delete(`/admin/deleteUser/:uid`,(req,res) => {
  const uid = req.params.uid;

  User.findByIdAndRemove(uid).then(()=>{
      resData.code = 0;
      resData.message = 'success';
      res.send(resData)
    }
  ).catch(()=>{
    resData.code = 1;
    resData.message = 'failed';
    res.send(resData)
  })
});

router.post(`/admin/postInfo`,(req,res) =>{
  const createTime = new Date().toLocaleString();
  const info = new Info({
    title : req.body.title,
    content : req.body.content,
    sponsor : req.body.sponsor,
    createTime : createTime
  });
  info.save();
  resData.code = 0;
  resData.message = 'success';
  res.json(resData)
});

router.patch(`/admin/updateInfo/:id`,(req,res) =>{
  const id = req.params.id;
  const title = req.body.title;
  const sponsor = req.body.sponsor;
  const content = req.body.content;

  Info.findByIdAndUpdate(id, {
    title: title,
    sponsor: sponsor,
    content: content
  }).then(()=>{
      resData.code = 0;
      resData.message = 'success';
      res.send(resData)
    }
  ).catch(()=>{
    resData.code = 1;
    resData.message = 'failed';
    res.send(resData)
  })
});

router.delete(`/admin/deleteInfo/:id`,(req,res) =>{
  const id = req.params.id;

  Info.findByIdAndRemove(id).then(()=>{
      resData.code = 0;
      resData.message = 'success';
      res.send(resData)
    }
  ).catch(()=>{
    resData.code = 1;
    resData.message = 'failed';
    res.send(resData)
  })
});

router.post(`/admin/postTopic`, (req,res) =>{
  const createTime = new Date().toLocaleString();
  const topic = new Topic({
    title : req.body.title,
    content : req.body.content,
    sponsor : req.body.sponsor,
    createTime : createTime
  });
  topic.save();
  resData.code = 0;
  resData.message = 'success';
  res.json(resData)
});

router.post(`/admin/postTopicList`,(req,res) =>{
  let topicArray = req.body.topicList;
  console.log(topicArray);
  const createTime = new Date().toLocaleString();
  if(topicArray instanceof Array){
    topicArray.map(t=>{
      t.createTime = createTime
    });
    Topic.create(topicArray).then((topics)=>{
      console.log(topics)
    });
  }
  else {
    resData.code = 1;
    resData.message = 'data type error';
    res.json(resData)
  }
  resData.code = 0;
  resData.message = 'success';
  res.json(resData)
});

router.patch(`/admin/updateTopic/:id`,(req,res) =>{
  const id = req.params.id;
  const title = req.body.title;
  const sponsor = req.body.sponsor;
  const content = req.body.content;

  Topic.findByIdAndUpdate(id, {
    title: title,
    sponsor: sponsor,
    content: content
  }).then(()=>{
      resData.code = 0;
      resData.message = 'success';
      res.send(resData)
    }
  ).catch(()=>{
    resData.code = 1;
    resData.message = 'failed';
    res.send(resData)
  })
});

router.delete(`/admin/deleteTopic/:id`,(req,res) =>{
  const id = req.params.id;

  Topic.findByIdAndRemove(id).then(()=>{
      resData.code = 0;
      resData.message = 'success';
      res.send(resData)
    }
  ).catch(()=>{
    resData.code = 1;
    resData.message = 'failed';
    res.send(resData)
  })
});

router.post(`/admin/uploadFiles`,upload.array('files', 20),(req,res) =>{
  const type = req.body.type;
  const fileList = req.files;

  const createTime = new Date().toLocaleString();

  fileList.map(t=>{
    t.fileName = (t.originalname).split('.')[0];
    t.url = `${t.destination}/${t.originalname}`;
    t.count = 0;
    t.type = type;
    t.createTime = createTime;
  });
  console.log(fileList);
  Document.create(fileList).then(()=>{
    resData.code = 0;
    resData.message = 'success';
    res.json(resData)
  }).catch(err=>{
    resData.message = 1;
    resData.message = `failed`;
    console.log(err);
    res.json(resData);
  });
});

router.patch(`/admin/updateFile/:id`,(req,res) =>{
  const id = req.params.id;
  const fileName = req.body.fileName;
  const url = req.body.url;
  const count = req.body.count;
  const type = req.body.type;
  const createTime = new Date().toLocaleString();

  Document.findByIdAndUpdate(id, {
    fileName: fileName,
    url: url,
    count: count,
    type: type,
    createTime: createTime,
  }).then(()=>{
      resData.code = 0;
      resData.message = 'success';
      res.send(resData)
    }
  ).catch(()=>{
    resData.code = 1;
    resData.message = 'failed';
    res.send(resData)
  })
});

router.delete(`/admin/deleteFile/:id`,(req,res) =>{
  const id = req.params.id;

  Document.findByIdAndRemove(id).then(()=>{
      resData.code = 0;
      resData.message = 'success';
      res.send(resData)
    }
  ).catch(()=>{
    resData.code = 1;
    resData.message = 'failed';
    res.send(resData)
  })
});

router.post(`/admin/uploadLessons`,upload.array('lessons', 20),(req,res) =>{
  const type = req.body.type;
  const lessonList = req.files;

  const createTime = new Date().toLocaleString();

  lessonList.map(t=>{
    t.title = (t.originalname).split('.')[0];
    t.url = `${t.destination}/${t.originalname}`;
    t.type = type;
    t.createTime = createTime;
  });
  console.log(lessonList);
  Lesson.create(lessonList).then(()=>{
    resData.code = 0;
    resData.message = 'success';
    res.json(resData)
  }).catch(err=>{
    resData.message = 1;
    resData.message = `failed`;
    console.log(err);
    res.json(resData);
  });
});

router.patch(`/admin/updateLesson/:id`,(req,res) =>{
  const id = req.params.id;
  const title = req.body.title;
  const url = req.body.url;
  const type = req.body.type;
  const createTime = new Date().toLocaleString();

  Lesson.findByIdAndUpdate(id, {
    title: title,
    url: url,
    type: type,
    createTime: createTime,
  }).then(()=>{
      resData.code = 0;
      resData.message = 'success';
      res.send(resData)
    }
  ).catch(()=>{
    resData.code = 1;
    resData.message = 'failed';
    res.send(resData)
  })
});

router.delete(`/admin/deleteLesson/:id`,(req,res) =>{
  const id = req.params.id;

  Lesson.findByIdAndRemove(id).then(()=>{
      resData.code = 0;
      resData.message = 'success';
      res.send(resData)
    }
  ).catch(()=>{
    resData.code = 1;
    resData.message = 'failed';
    res.send(resData)
  })
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

router.get(`/getLessonList`,(req,res) =>{
  Lesson.find().then(doc=> {
    resData = doc;
    res.send(resData)
  }).catch(err=>{
    resData.message = 1;
    resData.message = `failed`;
    console.log(err);
    res.json(resData);
  });
});

router.get(`/getDocList`,(req,res) =>{
  Document.find().then(doc=> {
    resData = doc;
    res.send(resData)
  }).catch(err=>{
    resData.message = 1;
    resData.message = `failed`;
    console.log(err);
    res.json(resData);
  });
});

router.post(`/user/:uid/postTopic`,(req,res) =>{
  const createTime = new Date().toLocaleString();
  const topic = new Topic({
    title : req.body.title,
    content : req.body.content,
    sponsor : req.body.sponsor,
    avatar : req.body.avatar,
    type : req.body.type,
    createTime : createTime
  });
  topic.save();
  resData.code = 1;
  resData.message = 'success';
  res.json(resData)
});

router.patch(`/user/reply/:id`,(req,res) =>{
  const id = req.params.id;
  const replyUsername = req.body.username;
  const replyContent = req.body.content;
  const createTime = new Date().toLocaleString();
  const reply = {
    username: replyUsername,
    content: replyContent,
    createTime: createTime,
  };

  Topic.findByIdAndUpdate(id, {
    $push : {
      reply: reply
    }
  }).then(()=>{
      resData.code = 0;
      resData.message = 'success';
      res.send(resData)
    }
  ).catch(()=>{
    resData.code = 1;
    resData.message = 'failed';
    res.send(resData)
  })
});

router.get(`/user/:uid/file/:fid`,(req,res) =>{
  const id = req.params.fid;
  Document.findOne({
    _id: id
  }).then(file=>{
    console.log(file);
    const url = file.url;
    file.count++;
    file.save();
    res.download(url)
  }).catch(err=>{
    console.log(err)
  })
});


module.exports = router;
