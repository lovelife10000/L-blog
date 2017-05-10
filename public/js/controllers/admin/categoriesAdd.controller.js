/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 添加分类
 * */
app.controller('categoriesAdd', ['$scope', '$http','categoriesAddService', function ($scope, $http,categoriesAddService) {
  $scope.cateParentOptions = [
    {name: '无', id: 0},
    {name: '一级分类', id: 1},
    {name: '二级分类', id: 2},
    {name: '三级分类', id: 3},

  ];
  $scope.cate_parent = $scope.cateParentOptions[1].id;//设置默认值
  /*
   * 获取所有分类数据
   * */
  categoriesAddService.getCategories().then(function success(res) {
    console.log(res.data);
  },function error(res) {

  });




  $scope.categoriesAdd = function () {
    if ($scope.myForm.$valid) {
        categoriesAddService.get($scope.cate_name,$scope.cate_slug,$scope.cate_order,$scope.cate_parent,$scope.cate_remark).then(function success(res) {

      }, function error(res) {

      });
    }

  };
}]);