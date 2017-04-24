/**
 * Created by v_lljunli on 2017/4/17.
 */
var mongoose=require('mongoose');

//用户的表结构，定义字段
var AdminUserSchema=new mongoose.Schema({
  adminUser_uid:Number,
  adminUser_username:String,
  adminUser_nickname:String,
  adminUser_avatar:{ type: String, default: "/upload/images/defaultlogo.png" },
  adminUser_password:String,
  adminUser_repassword:String,
  adminUser_userGroup: {
    type : String,
    ref : 'AdminUserGroup'

  },
  adminUser_phone:Number,
  adminUser_email:String,
  adminUser_remark:String,
  date:{ type: Date, default: Date.now }
});

var AdminUser=mongoose.model('AdminUser',AdminUserSchema);



module.exports=AdminUser;