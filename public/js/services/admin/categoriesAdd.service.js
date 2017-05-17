/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('categoriesAddService', ['$http', function ($http) {
  return {
    get: function (cate_name, cate_slug, cate_order, cate_parent, cate_remark) {
      console.log(cate_name);
      console.log(cate_slug);
      console.log(cate_order);
      console.log(cate_parent);
      console.log(cate_remark);
      return $http({
        method: 'POST',
        url: 'add',
        data: $.param({
          cate_name: cate_name,
          cate_slug: cate_slug,
          cate_order: cate_order,
          cate_parent: cate_parent,
          cate_remark: cate_remark
        }),
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      });
    },

    /*
     * 获取所有分类数据
     * */
    getCategories: function () {
      return $http({
        method: 'GET',
        url: 'get',
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      });
    },

  };
}]);