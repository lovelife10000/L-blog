/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 添加分类
 * */
app.controller('categoriesAdd', ['$scope', '$http','categoriesAddService', function ($scope, $http,categoriesAddService) {

  /*
   * 获取所有分类数据
   * */
  categoriesAddService.getCategories().then(function success(res) {
    console.log(res.data);
    var data=res.data;
    var dataFormat=[];
    for(var i=0;i<data.length;i++){
      dataFormat.push({
        name:data[i].cate_name,
        id:0
      });
    }
    dataFormat.unshift({
      name:'无',
      id:0
    });
    /*
     * 设置默认值
     * */
    $scope.cateParentOptions = dataFormat;
    console.log($scope.cateParentOptions);
    $scope.cate_parent = $scope.cateParentOptions[1].id;
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