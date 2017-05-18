/**
 * Created by v_lljunli on 2017/5/8.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var PostSchema=Schema({
  post_id:Number,
  post_title:String,
  post_publish_date:String,
  post_category:String,
  post_from:String,
  post_type:String,
  post_recommend:Number,
  post_hot:Number,
  post_view:String,
  post_comment_num:Number,
  post_display:Number,
  post_author:String,
  post_tags:String,
  post_keywords:String,
  post_abstract:String,
  post_img:String,
  post_content:String,
});
var Post=mongoose.model('Posts',PostSchema);
module.exports=Post;