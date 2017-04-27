/**
 * Created by v_lljunli on 2017/4/17.
 */
var express=require('express');
var router=express.Router();
var AdminUser=require('../models/AdminUser');
var AdminUserGroup=require('../models/AdminUserGroup');

router.get('/',function (req,res,next) {
  res.render('admin/admin');
});
//所有用户组
router.get('/users_group',function (req,res,next) {
  /*
  * 查询数据库，获取用户组列表
  * */
  AdminUserGroup.find().then(function(adminUserGroups) {
    if(adminUserGroups){
      res.render('admin/users_group',{
        adminUserGroups:adminUserGroups,
        name:adminUserGroups.name,
        pid:adminUserGroups.pid,
        status:adminUserGroups.status,
        remark:adminUserGroups.remark
      });
    }else {
      res.json('用户组不存在');
    }
  });

});

//添加用户组
router.get('/users_group_add',function (req,res,next) {
  res.render('admin/users_group_add');
});

router.post('/users_group_add/add',function (req,res,next) {
  var name=req.body.name;
  var pid=req.body.pid;
  var status=req.body.status;
  var remark=req.body.remark;
  /*
  * 查询数据库
  * */
  AdminUserGroup.findOne({
    name:name
  }).then(function(adminUserGroupInfo) {
    if(adminUserGroupInfo){
      res.json({
        code:0,
        msg:'用户组已存在'
      });
    }else{
      var adminUserGroup=new AdminUserGroup({
        name:name,
        pid:pid,
        status:status,
        remark:remark
      });
      adminUserGroup.save();
      res.json({
        code:1,
        msg:'新增成功'
      });
    }
  });

});
//所有用户
router.get('/users',function (req,res,next) {

  /*
  * 读取用户数据
  * */
  AdminUser.find().then(function(users) {
    console.log(users);
    res.render('admin/users',{
      users:users
    });
  });

});

//添加用户
router.get('/users_add',function (req,res,next) {
  res.render('admin/users_add');
});
router.post('/users_add/add',function (req,res,next) {
    var adminUser_username=req.body.adminUser_username;
    var adminUser_nickname=adminUser_nickname;
    var adminUser_avatar=req.body.adminUser_avatar;
    var adminUser_password=req.body.adminUser_password;
    var adminUser_repassword=req.body.adminUser_repassword;
    var adminUser_userGroup=req.body.adminUser_userGroup;
    var adminUser_phone=Number(req.body.adminUser_phone);
    var adminUser_email=req.body.adminUser_email;
    var adminUser_remark=req.body.adminUser_remark;
  console.log(adminUser_username);

  /*
  * 查询数据库是否已经存在该用户
  * */
  
  AdminUser.findOne({
    adminUser_username:adminUser_username
  }).then(function (usernames) {
    if(usernames){
      res.json({
        code:0,
        msg:'用户名已存在'
      });
    }else{
      var adminUser= new AdminUser({
        adminUser_username:adminUser_username,
        adminUser_nickname:adminUser_nickname,
        adminUser_avatar:adminUser_avatar,
        adminUser_password:adminUser_password,
        adminUser_repassword:adminUser_repassword,
        adminUser_userGroup:adminUser_userGroup,
        adminUser_phone:adminUser_phone,
        adminUser_email:adminUser_email,
        adminUser_remark:adminUser_remark
      });
      adminUser.save();
      res.json({
        code:1,
        msg:'新增成功'
      });
    }
  });
});

//登录记录
router.get('/login_log',function (req,res,next) {
  res.render('admin/login_log');
});

//所有文章
router.get('/articles',function (req,res,next) {
  res.render('admin/articles');
});

//文章分类
router.get('/articles_categories',function (req,res,next) {
  res.render('admin/articles_categories');
});

//添加分类
router.get('/articles_categories_add',function (req,res,next) {
  res.render('admin/articles_categories_add');
});

//接收文件上传请求
router.post('/upload',function (req,res,next) {
  console.log('接收成功');
});

module.exports=router;