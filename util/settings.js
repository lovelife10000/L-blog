/**
 * Created by v_lljunli on 2017/5/5.
 */
module.exports={
  SESSION_SECRET:'L-blog-secret',
  COOKIE_SECRET:'L-BLOG',


  /*
  * 本地缓存设置
  * */
  REDIS_HOST: '127.0.0.1',
  REDIS_PORT: 6379,
  REDIS_PSD: '',
  REDIS_DB: 0,

  /*
  * 博客配置
  * */
  BLOG:'L-blog博客管理系统',
  BLOG_NAME:'L-blog',

  /*
  * 博客功能列表
  * */
  PANEL:['panel','仪表盘'],
  BASIC_INFO:['basicInfo','基本信息'],
  PASSWORD_MODIFY:['password_modify','修改密码'],

  USERS_MANAGE:['usersManage','用户管理'],
  ALL_USERS_GROUP:['allUsersGroup','所有用户组'],
  ALL_USERS_GROUP_ADD:['allUsersGroupAdd','添加用户组'],
  ALL_USERS:['allUsers','所有用户'],
  ALL_USERS_ADD:['allUsersAdd','添加用户'],
  LOGIN_LOG:['loginLog','登录记录'],

  DOCUMENT_MANAGE:['documentManage','文档管理'],
  ALL_DOCUMENT:['allDocument','所有文档'],
  CATEGORIES_ALL:['categories_all','所有分类'],
  ARTICLES_CATEGORY_ADD:['CategoriesAdd','添加分类'],
  ARTICLES_ADD:['articles_add','写文档'],



};