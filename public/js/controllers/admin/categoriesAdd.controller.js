/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 添加分类
 * */
app.controller('categoriesAdd', ['$scope', '$http', function ($scope, $http) {
  $scope.cateParentOptions = [
    {name: '无', id: 0},
    {name: '一级分类', id: 1},
    {name: '二级分类', id: 2},
    {name: '三级分类', id: 3},

  ];
  $scope.cate_parent = $scope.cateParentOptions[1].id;//设置默认值
  $scope.categoriesAdd = function () {
    if ($scope.myForm.$valid) {
      $http({
        method: 'POST',
        url: 'articles_categories_add',
        data: $.param({
          cate_name: $scope.cate_name,
          cate_slug: $scope.cate_slug,
          cate_order: $scope.cate_order,
          cate_parent: $scope.cate_parent,
          cate_remark: $scope.cate_remark
        }),
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      }).then(function success(res) {

      }, function error(res) {

      });
    }

  };
}]);