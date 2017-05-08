/**
 * Created by v_lljunli on 2017/5/8.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var PostSchema=Schema({
  post_id:Number,
  post_title:Number,
  post_publish_date:String,
  post_category:String,
  post_from:Number,
  post_type:String
  post_recommend:Boolean,
  post_view:Number,
  post_comment_num:Number,
  post_display:Boolean,
  post_author:String,
});
var Post=mongoose.model('Posts',PostSchema);
module.exports=Post;