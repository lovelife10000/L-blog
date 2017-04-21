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
  res.render('admin/users_group');
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
      console.log(req.body);
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
  User.find().then(function(users) {
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



module.exports=router;