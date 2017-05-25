/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('documentAllService',['$http',function ($http) {
  return{
    get:function () {
      return $http({
        method:'GET',
        url:'/admin/manage/document_manage/get_all_document',
        headers:{'content-type':'application/x-www-form-urlencoded'}
      });
    },

  };
}]);