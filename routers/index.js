/**
 * Created by v_lljunli on 2017/4/17.
 */
var express=require('express');
var router=express.Router();
var Category=require('../models/Category');
var system=require('../util/system');
router.get('/',function (req,res,next) {
  /*
  * 获取分类
  * */
  Category.find().then(function (info) {
    var categories=system.categoriesFormat(info);
    console.log(categories);
    res.render('index/default/templates/index',system.renderFront(categories));
  });

});

module.exports=router;