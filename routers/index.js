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
router.get('/', function (req, res, next) {


  /*
   * 获取文档分类
   * */
  Category.find().then(function (cate) {
    var categories = system.categoriesFormat(cate);
    req.session.categories = categories;
    /*
     * 获取文档数据
     * */

    /*
     * 分页显示
     * */

    var pageList = req.query.page || 1;//当前页
    var limitList = 2;//每页显示的条数
    var skipList = (pageList - 1) * limitList;//忽略掉的条数
    Document.find().limit(limitList).skip(skipList).then(function (posts) {
      var documentAll = posts;
      req.session.documentAll = documentAll;

      req.session.documentHot = posts;
      req.session.documentRecommend = posts;


      res.render('index/' + theme + '/templates/index', {
        theme: theme,
        categories: req.session.categories,
        documentAll: req.session.documentAll,
        documentHot: req.session.documentHot,
        documentRecommend: req.session.documentRecommend,
        pageList: pageList,
      });
    });


    // Post.find().then(function (posts) {
    //   var documentAll=posts;
    //   req.session.documentAll=documentAll;
    //   var documentHot=[];
    //   for(var i=0;i<posts.length;i++){
    //     if(posts[i].post_hot===1){
    //       documentHot.push(posts[i]);
    //     }
    //   }
    //
    //   req.session.documentHot=documentHot;
    //
    //
    //   var documentRecommend=[];
    //   for(var j=0;j<posts.length;j++){
    //
    //     if(posts[j].post_recommend===1){
    //
    //       documentRecommend.push(posts[j]);
    //     }
    //   }
    //   req.session.documentRecommend=documentRecommend;
    //
    //   res.render('index/default/templates/index',system.renderFront(req.session.categories,req.session.documentAll,req.session.documentHot,req.session.documentRecommend));
    // });

  });

});
/*
 * 首页列表分页显示
 * */
router.get('/page/:number', function (req, res, next) {
  var categoriesData = Category.find();
  var documentCount = Document.count();
  var documentAllData = Document.find();
  var documentHotData = Document.find({document_hot: 1});
  var documentRecommendData = Document.find({document_recommend: 1});

  Promise.all([categoriesData, documentCount, documentAllData, documentHotData, documentRecommendData]).then(function (result) {

    var categories = system.categoriesFormat(result[0]);
    var documentAll = result[2];
    var documentHot = result[3];
    var documentRecommend = result[4];
    res.render('index/' + theme + '/templates/index', {
      theme: theme,
      categories: categories,
      documentAll: documentAll,
      documentHot: documentHot,
      documentRecommend: documentRecommend,
      // pageList:pageList,
      // pageAll:pageAll,
    });
  });


  // var pageList=Number(req.params.number) || 1;//当前页
  // var limitList=2;//每页显示的条数
  // var skipList=(pageList-1)*limitList;//忽略掉的条数
  // var pageAll=Math.ceil(count/limitList);
  // Post.find().limit(limitList).skip(skipList).then(function (posts) {


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
