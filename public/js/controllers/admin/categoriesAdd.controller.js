/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 添加分类
 * */
app.controller('categoriesAdd', ['$scope', '$http','categoriesAllService','$sce', function ($scope, $http,categoriesAllService,$sce) {

  /*
   * 格式化所有分类数据
   * */
  categoriesAllService.getCategories().then(function success(res) {

    var data=res.data;
    var dataFormat=[];

    for(var j=0;j<data.length;j++){
      if(data[j].cate_parent===''){
        dataFormat.push({
          name:data[j].cate_name,
          id:data[j].cate_slug,
          cate_name:data[j].cate_name,
          cate_slug:data[j].cate_slug,
        });
      }

    }

    for(var m=0;m<dataFormat.length;m++){
      for(var z=0;z<data.length;z++){
        console.log(1);
        if(dataFormat[m].id===data[z].cate_parent){
          dataFormat.splice(m+1,0,{
            name:''+'└'+data[z].cate_name,
            id:data[z].cate_slug,
            cate_name:data[z].cate_name,
            cate_slug:data[z].cate_slug,
          });

        }

      }
    }
    dataFormat.unshift({
      name:'无',
      id:'',
    });

    /*
     * 设置默认值
     * */
    $scope.cateParentOptions = dataFormat;
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