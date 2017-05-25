/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('documentWriteService',['$http',function ($http) {
  return{
    get:function (title,from,display,hot,recommend,tags,img,category,keywords,abstract,type,view,author,content) {
      return $http({
        method:'POST',
        url:'/admin/manage/document_manage/write',
        data:$.param({
          document_title:title,
          document_from:from,
          document_display:display,
          document_hot:hot,
          document_recommend:recommend,
          document_tags:tags,
          document_img:img,
          document_category:category,
          document_keywords:keywords,
          document_abstract:abstract,
          document_type:type,
          document_view:view,
          document_author:author,
          document_content:content
        }),
        headers:{'content-type':'application/x-www-form-urlencoded'}
      });
    },

  };
}]);