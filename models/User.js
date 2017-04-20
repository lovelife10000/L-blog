/**
 * Created by v_lljunli on 2017/4/17.
 */
var mongoose=require('mongoose');

//用户的表结构，定义字段
var userSchema=new mongoose.Schema({
  username:String,
  password:String
});

var User=mongoose.model('User',userSchema);



module.exports=User;