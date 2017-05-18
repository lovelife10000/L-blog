/**
 * Created by v_lljunli on 2017/5/17.
 */
app.factory('categoriesAllService',['$http',function ($http) {
  return{
    get:function (title,from,display,tags,img,parent,keywords,discription,type,view,author,content) {
      $http({
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

    /*
     * 获取所有分类数据
     * */
    getCategories: function () {
      return $http({
        method: 'GET',
        url: '/admin/manage/document_manage/categories_manage/get',
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      });
    },



  };
}]);