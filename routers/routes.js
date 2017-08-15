/**
 * Created by v_lljunli on 2017/4/17.
 */
var express = require('express');
var router = express.Router();
var system = require('../util/system');

/*
 * 加载数据模型
 * */
var Category = require('../models/Category');
var Document = require('../models/Document');
var theme = 'woshipm';
/*
 * 首页
 * */
router.get('/', require('/http/controller/index/index'));
/*
 * 首页列表分页显示
 * */
router.get('/page/:number', function (req, res, next) {

  var categoriesData = Category.find();
  var documentCount = Document.count();
  var documentAllData = Document.find();
  var documentHotData = Document.find({document_hot: 1});

  Promise.all([categoriesData, documentCount, documentAllData, documentHotData]).then(function (result) {

    var categories = system.categoriesFormat(result[0]);

    res.render('index/' + theme + '/templates/index', {
      theme: theme,
      categories: categories,
      documentAll: result[2],
      documentHot: result[3],


    });
  });


});

/*
 * 内容页
 * */
router.get('/content/:title', function (req, res, next) {
  var title = req.params.title;
  var categoriesData = Category.find();
  var documentByTitleData = Document.find({document_title: title});

  Promise.all([categoriesData, documentByTitleData]).then(function (result) {

    if (!result[1]) {
      res.render('index/' + theme + '/templates/404');
    } else {
      res.render('index/' + theme + '/templates/content', {
        theme: theme,
        categories: result[0],
        singleDocument: result[1],
      });
    }


  });


});

/*
 * 用户登录页
 * */
router.get('/user/login', function (req, res, next) {

  res.render('index/' + theme + '/templates/login', {
    theme: theme,
  });


});
/*
 * 列表页
 * */

router.get('/list/:cate', function (req, res, next) {
  var cate = req.params.cate;
  var categoriesData = Category.find();
  var documentAllData = Document.find();

  Promise.all([categoriesData, documentAllData]).then(function (result) {
    var categories = system.categoriesFormat(result[0]);
    res.render('index/' + theme + '/templates/list', {
      theme: theme,
      categories: categories,
      documentAll: result[1],
    });


  });


});


module.exports = router;
