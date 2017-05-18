/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('documentWriteService',['$http',function ($http) {
  return{
    get:function (title,from,display,tags,img,category,keywords,abstract,type,view,author,content) {
      return $http({
        method:'POST',
        url:'/admin/manage/document_manage/write',
        data:$.param({
          post_title:title,
          post_from:from,
          post_display:display,
          post_tags:tags,
          post_img:img,
          post_category:category,
          post_keywords:keywords,
          post_abstract:abstract,
          post_type:type,
          post_view:view,
          post_author:author,
          post_content:content
        }),
        headers:{'content-type':'application/x-www-form-urlencoded'}
      });
    },

  };
}]);