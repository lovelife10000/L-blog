/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('recycleService',['$http',function ($http) {
  return{

    /*
    * 根据每页显示数、第几页来获取回收站文档数据
    * */
    postLimitAndPage:function (limit,page) {
      return $http({
        method:'POST',
        url:'/admin/manage/document_manage/get_no_display_document',
        data:$.param({
          limit:limit,
          page:page,
        }),
        headers:{'content-type':'application/x-www-form-urlencoded'}
      });
    },
    /*
    * 删除单篇文档
    * */
    removeOneDocument:function (doc) {
      return $http({
        method:'POST',
        url:'/admin/manage/document_manage/remove_one_document',
        data:$.param({
          data:doc,
        }),
        headers:{'content-type':'application/x-www-form-urlencoded'}
      });
    },



  };
}]);