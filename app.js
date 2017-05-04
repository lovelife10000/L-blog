/**
 * Created by v_lljunli on 2017/4/17.
 */
//加载express模块
var express=require('express');

//配置应用模版
var swig=require('swig');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var Cookies=require('cookies');


//创建app应用
var app=express();

//设置cookie
app.use(function(req,res,next) {
  req.cookies=new Cookies(req,res);
  console.log(req.cookies.get('loginInfo'));
  next();
});
//设置静态文件托管
app.use('/public',express.static(__dirname+'/public'));

//设置模版引擎
// app.engine('html', swig.renderFile);
//设置视图文件夹
app.set('views','./views');
//设置视图引擎格式
// app.set('view engine','html');
app.set('view engine','ejs');

//在开发模式中，取消模版缓存
swig.setDefaults({cache:false});

//配置body-parser
app.use(bodyParser.urlencoded({extended:true}));

//创建模块
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/index'));

//尝试测试数据库是否联通
mongoose.connect('mongodb://localhost:27017/blog',function (err) {
  if(err){
    console.log('数据库连接失败');
  }else {
    console.log('数据库连接成功');
    //监听http请求
    app.listen(8082);
  }
});





