# L-blog
基于nodejs、mongodb、express、angularjs、bootstrap、ejs等搭建的blog内容管理系统
###-------------------------------------------------------------------------------

![image](https://github.com/lovelife10000/L-blog/raw/master/public/upload/images/example.png)

# 开发流程

- 用户管理
    - 添加用户组
    - 所有用户组
    - 添加用户
    - 所有用户
    - 下周一计划是实现所有用户功能，再分析一下对于用户是分2张表还是1张表

- ejs模版使用
- cookie-parser的使用
- 使用redis缓存系统
- 使用更加安全的session
下周任务，完成如何使用cookie-parser、express-session、redis、connect-redis实现对用户状态的存取。
- 添加文章分类功能
- 添加文章功能
- 解决mongodb id自动增长的功能
- 获取ztree的数据
-下周记得解决下ztree的关联操作问题
- 记得下周给更新权限以返回值，要不然请求一直pending

- 遇见3个问题，搞了好久，在此记录一下啊
 1.一个是请求挂在pending的时候，发现该请求中的代码没有得到执行，虽然表面上是执行了，但是只是在该请求的时候有效，在请求外无效。
 2.get和post请求区别，post请求无法使用重定向
 3.get请求里的重定向是有条件的，只有当前浏览器url地址是get请求的地址时，才有效，要不然得用location，这是redirect和location的区别
- 制作后台用户注册页