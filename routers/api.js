/**
 * Created by v_lljunli on 2017/4/17.
 */
var express=require('express');
var router=express.Router();
var User=require('../models/User');

//定义统一的响应格式
var responseData;
router.use(function (req,res,next) {
  responseData={
    code:0,
    msg:''
  };
  next();
});

router.post('/user/register',function (req,res,next) {
  //判断用户名为空
  if(req.body.username==''){
    responseData.code=1;
    responseData.msg='用户名不能为空';
    res.json(responseData);
  }else {//不为空
    //判断密码是否为空
    if(req.body.password==''){//密码为空
      responseData.code=2;
      responseData.msg='密码不能为空';
      res.json(responseData);
    }else{//不为空
      //判断确认密码是否为空
      if(req.body.repassword==''){//确认密码为空
        responseData.code=2;
        responseData.msg='确认密码不能为空';
        res.json(responseData);
      }else{//不为空
        //判断密码和确认密码是否相等
        if(req.body.password!=req.body.repassword){
          responseData.code=3;
          responseData.msg='密码和确认密码不相同';
          res.json(responseData);
        }else{
          /*
          * 数据库验证          *
          * */
          User.findOne({
            username:req.body.username
          }).then(function(userInfo) {
            if(userInfo){
              responseData.code=4;
              responseData.msg='用户名被注册了';
              res.json(responseData);
            }else{//未被注册，保存数据
              var user=new User({
                username:req.body.username,
                password:req.body.password
              });
              user.save();
              responseData.code=0;
              responseData.msg='注册成功';
              res.json(responseData);

            }

          });

        }
      }
    }
  }

});

router.post('/user/login',function(req,res,next) {
  console.log(req.body);
  if(req.body.username=='' ||req.body.password==''){
    responseData.code=1;
    responseData.msg='用户名或者密码为空';
    res.json(responseData);
  }else {
    User.findOne({
      username:req.body.username,
      password:req.body.password
    }).then(function (userInfo) {
      if(!userInfo){
        responseData.code=2;
        responseData.msg='用户名或者密码错误';
        res.json(responseData);
      }else {
        responseData.code=0;
        responseData.msg='登录成功';
        responseData.userInfo={
          _id:userInfo._id,
          username:userInfo.username
        };
        res.json(responseData);
        req.cookies.set('userInfo','ss');//发送cookies到浏览器，浏览器保存cookies
      }
    });
  }
});
module.exports=router;