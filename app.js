/**
 * Created by v_lljunli on 2017/4/17.
 */
/*
* 引入中间件
* */
var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var settings=require('./util/settings');

/*
* 创建app应用
* */
var app=express();

/*
* 设置cookie
* */
app.use(cookieParser());

/*
* 设置session
* */
app.use(session({
  secret: settings.SESSION_SECRET,
  // store: new RedisStore({
  //   port: settings.redis_port,
  //   host: settings.redis_host,
  //   pass : settings.redis_psd,
  //   ttl: 1800 // 过期时间
  // }),
  resave: true,
  //saveUninitialized: true,
  cookie: { maxAge: 60 * 1000 }
}));

/*
* 所有请求访问入口
* */
app.use('/',function(req,res,next) {


  req.userInfo={};
  if(req.cookies.loginInfo){
    try{
      req.userInfo=JSON.parse(req.cookies.loginInfo);
    }
    catch(err){

    }

  }

  next();
});

/*
* 设置静态文件托管
* */
app.use('/public',express.static(__dirname+'/public'));

/*
* 设置模版引擎
* */
// app.engine('html', swig.renderFile);
/*
* 设置视图文件夹
* */
app.set('views','./views');
/*
* 设置视图引擎格式
* */
// app.set('view engine','html');
app.set('view engine','ejs');


/*
* 配置body-parser
* */
app.use(bodyParser.urlencoded({extended:true}));

/*
* 创建模块
* */
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/index'));

/*
* 尝试测试数据库是否联通
* */
mongoose.connect('mongodb://localhost:27017/blog',function (err) {
  if(err){
    console.log('数据库连接失败');
  }else {
    console.log('数据库连接成功');
    //监听http请求
    app.listen(8082);
  }
});





