var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

global.dbhandle = require('../database/dbhandle');
global.db = mongoose.connect("mongodb://localhost:27017/test");

router.get('/login',function(req,res){
  res.render('login',{'title':'登录'});
});

router.post('/login',function(req,res){
  var User = global.dbhandle.getModel('users');
  User.findOne({name:req.body.name},function(err,result){
    if(err){
      res.status(500);
      res.send(err);
    } else {
      if(!result){
        res.send('用户名不存在');
      }
      else if(result.pwd!=req.body.password){
        res.send("密码错误")
      }
      else{
        req.session.user=result;
        res.redirect('/chatroom');
      }
    }
  });
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '聊天室'});
});

module.exports = router;
