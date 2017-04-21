/**
 * Created by v_lljunli on 2017/4/17.
 */
var express=require('express');
var router=express.Router();
var User=require('../models/AdminUser');

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
  console.log('chenggong');
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