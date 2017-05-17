/**
 * Created by v_lljunli on 2017/5/16.
 */
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var http = require('http');
var util = require('util');
var url = require('url');
var fs = require('fs');
var moment = require('moment');
var gm = require('gm');
var system = require('../util/system');
var settings = require('../util/settings');
var cache = require('../util/cache');
var parser = require('ua-parser-js');

/*
 * 数据模型
 * */
var AdminUser = require('../models/AdminUser');
var AdminUserGroup = require('../models/AdminUserGroup');
var Category=require('../models/Category');
/*
 * 302重定向
 * */
router.get('/',function (req,res,next) {
  res.redirect('protocol');
});
/*
* 协议书
* */
router.get('/protocol',function (req,res,next) {
  res.render('install/protocol');
});

/*
* 环境测试
* */
router.get('/environment_test',function (req,res,next) {
  console.log(`Version: ${process.version}`);
  var ua = parser(req.headers['user-agent']);

  res.render('install/environment_test',{
    domain:req.headers.host,
    os:ua.os.name+':'+ua.os.version,
    engine:ua.engine.name+':'+ua.engine.version,
    nodeVersion: `Version: ${process.version}`,
    path:process.cwd(),
  });
});

/*
* 网站设置
* */
router.get('/website_settings',function (req,res,next) {
  res.render('install/website_settings');
});

/*
 * 安装完成
 * */
router.get('/complete',function (req,res,next) {
  res.render('install/complete');
});


module.exports=router;