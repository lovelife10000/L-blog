/**
 * Created by v_lljunli on 2017/4/17.
 */
var express = require('express');
var router = express.Router();
var AdminUser = require('../models/AdminUser');
var AdminUserGroup = require('../models/AdminUserGroup');
var formidable = require('formidable');
var http = require('http');
var util = require('util');
var url = require('url');
var fs = require('fs');
var moment = require('moment');
var gm = require('gm');
var system = require('../util/system');
var settings=require('../util/settings');
/*
* 后台用户登录302重定向
* */
router.get(["/manage",'/manage/*'],function(req,res,next){

  if(req.session.adminlogined){
    next();
  }else{
    res.redirect("/admin");
  }
});
/*
 * 用户登录
 * */
router.get('/', function (req, res, next) {

  if (req.session.adminlogined) {
    res.redirect('/admin/manage');
  } else {

    res.render('admin/admin_login',system.renderItem(req.session.userInfo.adminUser_username,settings.BLOG_NAME,settings.PANEL[1],settings.BASIC_INFO[1]));
  }

});
router.post('/admin_login', function (req, res, next) {
  var username = req.body.adminUser_username;
  var password = req.body.adminUser_password;

  AdminUser.findOne({
    adminUser_username: username,
    adminUser_password:password
  }).then(function (info) {
    if (!info) {
      res.json({
        code: 0,
        msg: '用户名不存在'
      });
    } else {
      if (info.adminUser_password !== password) {
        res.json({
          code: 0,
          msg: '用户名或密码不正确'
        });
      } else {
        req.session.adminlogined = true;
        req.session.userInfo={};

        if(req.cookies.loginInfo){

          try{
            req.session.userInfo=JSON.parse(req.cookies.loginInfo);
          }
          catch(err){}
        }
        //发送cookie到客户端
        res.cookie('loginInfo', JSON.stringify({
          adminUser_username: username,
          adminUser_password: password
        }), {
          //   domain: '.example.com',//cookie在什么域名下有效，类型为String,。默认为网站域名
          //   expires: new Date(Date.now() + 900000),//cookie过期时间，类型为Date。如果没有设置或者设置为0，那么该cookie只在这个这个session有效，即关闭浏览器后，这个cookie会被浏览器删除。
          //   httpOnly: true,//只能被web server访问，类型Boolean。
          //  maxAge: 10000,//实现expires的功能，设置cookie过期的时间，类型为String，指明从现在开始，多少毫秒以后，cookie到期。
          //   path: '/admin',//cookie在什么路径下有效，默认为'/'，类型为String
          //   secure: false,//只能被HTTPS使用，类型Boolean，默认为false
          //   signed: false//使用签名，类型Boolean，默认为false。`express会使用req.secret来完成签名，需要cookie-parser配合使用`
        });
        res.json({
          code: 1,
          msg: '登录成功'
        });

      }
    }
  });
});
/*
* 管理页首页
* */
router.get('/manage', function (req, res, next) {
    console.log(req.session.userInfo);

    res.render('admin/manage',system.renderItem(req.session.userInfo.adminUser_username,settings.BLOG_NAME,settings.PANEL[1],settings.BASIC_INFO[1]));


});
/*
 * 基本信息
 * */
router.get('/manage/basic_info', function (req, res, next) {

  AdminUser.findOne({
    adminUser_username: req.session.userInfo.adminUser_username
  }).then(function (userInfo) {
    var username = userInfo.adminUser_username;
    var avatar = userInfo.adminUser_avatar;
    var email = userInfo.adminUser_email;
    var date = userInfo.date;
    res.render('admin/basic_info',
      {
        username: username,
        avatar: avatar,
        email: email,
        date: date
      }
    );

  });

});

/*
 * 所有用户组
 * */
router.get('/manage/users_group', function (req, res, next) {
  /*
   * 查询数据库，获取用户组列表
   * */
  AdminUserGroup.find().then(function (adminUserGroups) {
    if (adminUserGroups) {
      res.render('admin/users_group',system.renderItem(req.session.userInfo.adminUser_username,settings.BLOG_NAME,settings.PANEL[1],settings.BASIC_INFO[1]));
    } else {
      res.json('用户组不存在');
    }
  });

});
router.get('/manage/users_group2', function (req, res, next) {

  /*
   * 读取用户数据
   * */
  AdminUserGroup.find().then(function (userGroup) {


    res.json(userGroup);
  });

});
/*
 * 添加用户组
 * */
router.get('/manage/users_group_add', function (req, res, next) {
  res.render('admin/users_group_add',system.renderItem(req.session.userInfo.adminUser_username,settings.BLOG_NAME,settings.PANEL[1],settings.BASIC_INFO[1]));
});
router.post('/manage/users_group_add/add', function (req, res, next) {
  var name = req.body.name;
  var pid = req.body.pid;
  var status = req.body.status;
  var remark = req.body.remark;
  var group_id = req.body.group_id;
  /*
   * 查询数据库
   * */
  AdminUserGroup.findOne({
    name: name
  }).then(function (adminUserGroupInfo) {
    if (adminUserGroupInfo) {
      res.json({
        code: 0,
        msg: '用户组已存在'
      });
    } else {
      var adminUserGroup = new AdminUserGroup({
        group_id: group_id,
        name: name,
        pid: pid,
        status: status,
        remark: remark
      });
      adminUserGroup.save();
      res.json({
        code: 1,
        msg: '新增成功'
      });
    }
  });

});
/*
 * 所有用户
 * */
router.get('/manage/users', function (req, res, next) {

  /*
   * 读取用户数据
   * */
  AdminUser.find().then(function (users) {

    res.render('admin/users',system.renderItem(req.session.userInfo.adminUser_username,settings.BLOG_NAME,settings.PANEL[1],settings.BASIC_INFO[1]));
  });

});
router.get('/manage/users2', function (req, res, next) {

  /*
   * 读取用户数据
   * */
  AdminUser.find().then(function (users) {


    res.json(users);
  });

});
/*
 * 添加用户
 * */
router.get('/manage/users_add', function (req, res, next) {
  res.render('admin/users_add',system.renderItem(req.session.userInfo.adminUser_username,settings.BLOG_NAME,settings.PANEL[1],settings.BASIC_INFO[1]));
});
router.post('/manage/users_add/add', function (req, res, next) {
  var adminUser_username = req.body.adminUser_username;
  var adminUser_nickname = adminUser_nickname;
  var adminUser_avatar = req.body.adminUser_avatar;
  var adminUser_password = req.body.adminUser_password;
  var adminUser_repassword = req.body.adminUser_repassword;
  var adminUser_userGroup = req.body.adminUser_userGroup;
  var adminUser_phone = Number(req.body.adminUser_phone);
  var adminUser_email = req.body.adminUser_email;
  var adminUser_remark = req.body.adminUser_remark;


  /*
   * 查询数据库是否已经存在该用户
   * */

  AdminUser.findOne({
    adminUser_username: adminUser_username
  }).then(function (usernames) {
    if (usernames) {
      res.json({
        code: 0,
        msg: '用户名已存在'
      });
    } else {
      var adminUser = new AdminUser({
        adminUser_username: adminUser_username,
        adminUser_nickname: adminUser_nickname,
        adminUser_avatar: adminUser_avatar,
        adminUser_password: adminUser_password,
        adminUser_repassword: adminUser_repassword,
        adminUser_userGroup: adminUser_userGroup,
        adminUser_phone: adminUser_phone,
        adminUser_email: adminUser_email,
        adminUser_remark: adminUser_remark
      });
      adminUser.save();
      res.json({
        code: 1,
        msg: '新增成功'
      });
    }
  });
});

/*
 * 登录记录
 * */
router.get('/manage/login_log', function (req, res, next) {
  res.render('admin/login_log',system.renderItem(req.session.userInfo.adminUser_username,settings.BLOG_NAME,settings.PANEL[1],settings.BASIC_INFO[1]));
});

/*
 * 所有文章
 * */
router.get('/manage/articles', function (req, res, next) {
  res.render('admin/articles',system.renderItem(req.session.userInfo.adminUser_username,settings.BLOG_NAME,settings.PANEL[1],settings.BASIC_INFO[1]));
});

/*
 * 文章分类
 * */
router.get('/manage/articles_categories', function (req, res, next) {
  res.render('admin/articles_categories',system.renderItem(req.session.userInfo.adminUser_username,settings.BLOG_NAME,settings.PANEL[1],settings.BASIC_INFO[1]));
});

/*
 * 添加分类
 * */
router.get('/manage/articles_categories_add', function (req, res, next) {
  res.render('admin/articles_categories_add',system.renderItem(req.session.userInfo.adminUser_username,settings.BLOG_NAME,settings.PANEL[1],settings.BASIC_INFO[1]));
});

/*
 * 接收文件上传请求
 * */
router.post('/manage/upload', function (req, res, next) {

  var params = url.parse(req.url, true, false);//获取参数
  var fileType = params.query.type;//获取文件类型
  var fileKey = params.query.key;//获取上传的文件的用途


  var updatePath = "public/upload/images/";//存放目录
  // var smallImgPath = "public/upload/smallimages/";//存放目录


  var newFileName = "";//修改后的文件名

  var form = new formidable.IncomingForm();
  form.uploadDir = updatePath;//设置保存的位置
  // var files=[];
  // var fields=[];
  // var docs=[];


  form.on('field', function (field, value) { //POST 普通数据 不包含文件 field 表单name value 表单value

    // fields.push([field,value]);
  });

  form.on('file', function (field, file) {//上传文件

    // files.push([field, file]);
    // docs.push(file);

    /*
     * 检查文件合法性
     * */
    var realFileType = system.getFileMimeType(file.path);//获取真实的文件后缀名

    var thisType = realFileType.fileType;

    var date = new Date();

    var ms = moment(date).format('YYYYMMDDHHmmss').toString();

    var typeKey = 'others';
    if (fileType == 'images') {
      typeKey = 'img';
    }

    newFileName = typeKey + ms + "." + thisType;

    if (fileType == 'images') {
      if (realFileType.fileType == 'jpg' || realFileType.fileType == 'jpeg' || realFileType.fileType == 'png' || realFileType.fileType == 'gif') {

        /*
         * 重命名文件
         * */
        fs.rename(file.path, updatePath + newFileName, function (error) {

        });

      }
    }


  });

  form.on('error', function (err) {
    console.log('出现错误');
  });

  form.on('end', function () {//解析完毕
    res.end('/public/upload/images/' + newFileName);
  });

  form.parse(req, function (error, fields, files) {//解析request对象

  });


});


module.exports = router;