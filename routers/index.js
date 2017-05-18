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
router.get('/',function (req,res,next) {
  /*
  * 获取文档分类
  * */
  Category.find().then(function (cate) {
    var categories=system.categoriesFormat(cate);

    /*
    * 获取文档数据
    * */
    Post.find().then(function (posts) {
      var documentAll=posts;
      var documentHot=[];
      for(var i=0;i<posts.length;i++){
        if(posts[i].post_hot===1){
          documentHot.push(posts[i]);
        }
      }

      var documentRecommend=[];
      for(var j=0;j<posts.length;j++){

        if(posts[j].post_recommend===1){

          documentRecommend.push(posts[j]);
        }
      }

      res.render('index/default/templates/index',system.renderFront(categories,documentAll,documentHot,documentRecommend));
    });

  });

});

module.exports=router;