/**
 * Created by v_lljunli on 2017/4/17.
 */
var express=require('express');
var router=express.Router();
var system=require('../util/system');

/*
* 加载数据模型
* */
var Category=require('../models/Category');
var Post=require('../models/Post');

/*
* 首页
* */
router.get('/',function (req,res,next) {
  // Post.findByHot(1,function (info) {
  //   console.log(info);
  // });


  /*
  * 获取文档分类
  * */
  Category.find().then(function (cate) {
    var categories=system.categoriesFormat(cate);
    req.session.categories=categories;
    /*
    * 获取文档数据
    * */

    /*
    * 分页显示
    * */

    var pageList=req.query.page || 1;//当前页
    var limitList=2;//每页显示的条数
    var skipList=(pageList-1)*limitList;//忽略掉的条数
    Post.find().limit(limitList).skip(skipList).then(function (posts) {
      var documentAll=posts;
      req.session.documentAll=documentAll;

      req.session.documentHot=posts;
        req.session.documentRecommend=posts;



      res.render('index/default/templates/index',{
        categories:req.session.categories,
        documentAll:req.session.documentAll,
        documentHot:req.session.documentHot,
        documentRecommend:req.session.documentRecommend,
        pageList:pageList,
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
router.get('/page/:number',function (req,res,next) {


  /*
   * 获取文档分类
   * */
  Category.find().then(function (cate) {
    var categories=system.categoriesFormat(cate);
    req.session.categories=categories;
    /*
     * 获取文档数据
     * */
    /*
    * 统计文档条数
    * */
    Post.count().then(function (count) {
      /*
       * 分页显示
       * */

      var pageList=Number(req.params.number) || 1;//当前页
      var limitList=2;//每页显示的条数
      var skipList=(pageList-1)*limitList;//忽略掉的条数
      var pageAll=Math.ceil(count/limitList);
      Post.find().limit(limitList).skip(skipList).then(function (posts) {
        var documentAll=posts;
        req.session.documentAll=documentAll;

        req.session.documentHot=posts;
        req.session.documentRecommend=posts;



        res.render('index/default/templates/index',{
          categories:req.session.categories,
          documentAll:req.session.documentAll,
          documentHot:req.session.documentHot,
          documentRecommend:req.session.documentRecommend,
          pageList:pageList,
          pageAll:pageAll,
        });
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
* 内容页
* */
router.get('/document/content/:title',function (req,res,next) {
  var title=req.params.title;
  Post.find({
    post_title:title
  }).then(function (post) {
    if(!post){
      res.render('index/default/templates/404');
    }else {
      var singleDocument=post;
      console.log(post);
      res.render('index/default/templates/content',system.renderFront(req.session.categories,req.session.documentAll,req.session.documentHot,req.session.documentRecommend,singleDocument));
    }
  });    

});


module.exports=router;