/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('documentAllService',['$http',function ($http) {
  return{
    get:function (limit,page) {
      return $http({
        method:'POST',
        url:'/admin/manage/document_manage/get_page_document',
        data:$.param({
          limit:limit,
          page:page,
        }),
        headers:{'content-type':'application/x-www-form-urlencoded'}
      });
    },
    postLimitAndPage:function (limit,page) {
      return $http({
        method:'POST',
        url:'/admin/manage/document_manage/get_page_document',
        data:$.param({
          limit:limit,
          page:page,
        }),
        headers:{'content-type':'application/x-www-form-urlencoded'}
      });
    },

  };
}]);