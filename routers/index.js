/**
 * Created by v_lljunli on 2017/4/17.
 */
var express=require('express');
var router=express.Router();

router.get('/',function (req,res,next) {
  res.render('index/default/templates/index');
});

module.exports=router;