/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('documentWriteService',['$http',function ($http) {
  return{
    get:function (title,from,display,tags,img,parent,keywords,discription,type,view,author,content) {
      return $http({
        method:'POST',
        url:'admin/manage/articles_add',
        data:$.param({
          post_title:title,
          post_from:from,
          post_display:display,
          post_tags:tags,
          post_img:img,
          cate_parent:parent,
          post_keywords:keywords,
          post_discription:discription,
          post_type:type,
          post_view:view,
          post_author:author,
          post_content:content
        }),
        headers:{'content-type':'applicatin/x-www-form-urlencoded'}
      });
    },

  };
}]);