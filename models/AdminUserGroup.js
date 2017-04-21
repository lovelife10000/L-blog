/**
 * Created by v_lljunli on 2017/4/21.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var AdminUserGroupSchema=Schema({
  id:Number,
  name:String,
  pid:Number,
  status:Number,
  remark:String
});
var AdminUserGroup=mongoose.model('AdminUserGroup',AdminUserGroupSchema);
module.exports=AdminUserGroup;