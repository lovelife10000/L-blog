/**
 * Created by v_lljunli on 2017/4/17.
 */
/*
 * 引入中间件
 * */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var settings = require('./util/settings');
var redisStore = require('connect-redis')(session);
/*
 * 创建app应用
 * */
var app = express();

/*
 * 设置cookie
 * */
app.use(cookieParser());

/*
 * 设置session
 * */
app.use(session({
  secret: settings.SESSION_SECRET,
  store: new redisStore({//session 的存储方式，默认存放在内存中，也可以使用 redis，mongodb 等。express 生态中都有相应模块的支持。
    port: settings.REDIS_PORT,
    host: settings.REDIS_HOST,
    pass: settings.REDIS_PSD,
    ttl: 1800 // 过期时间
  }),
  resave: true,
  //saveUninitialized: true,
  cookie: {maxAge: 30 * 60 * 1000}
}));

/*
 * 所有请求访问入口
 * */
app.use('/', function (req, res, next) {


  // req.session.userInfo={};
  //
  // if(req.cookies.loginInfo){
  //
  //   try{
  //     req.session.userInfo=JSON.parse(req.cookies.loginInfo);
  //   }
  //   catch(err){}
  // }

  // if(req.session.isVisit) {
  //   req.session.isVisit++;
  //   res.send('<p>第 ' + req.session.isVisit + '次来到此页面</p>');
  // } else {
  //   req.session.isVisit = 1;
  //   res.send('欢迎第一次来这里');
  // }

  next();
});

/*
 * 设置静态文件托管
 * */
app.use('/public', express.static(__dirname + '/public'));

/*
 * 设置模版引擎
 * */
// app.engine('html', swig.renderFile);
/*
 * 设置视图文件夹
 * */
app.set('views', './views');
/*
 * 设置视图引擎格式
 * */
// app.set('view engine','html');
app.set('view engine', 'ejs');


/*
 * 配置body-parser
 * */
app.use(bodyParser.urlencoded({extended: true}));

/*
 * 创建模块
 * */
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/index'));

/*
 * 尝试测试数据库是否联通
 * */
mongoose.connect('mongodb://localhost:27017/blog', function (err) {
  if (err) {
    console.log('数据库连接失败');
  } else {
    console.log('数据库连接成功');
    //监听http请求
    app.listen(8082);
  }
});





