/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 添加分类
 * */
app.controller('categoriesAdd', ['$scope', '$http','categoriesAddService','$sce', function ($scope, $http,categoriesAddService,$sce) {

  /*
   * 获取所有分类数据
   * */
  categoriesAddService.getCategories().then(function success(res) {
    console.log(res.data);
    var data=res.data;
    var dataFormat=[];
    var firstCate=[];
    var secondCate=[];
    for(var j=0;j<data.length;j++){
      if(data[j].cate_parent===''){
        firstCate.push({
          name:data[j].cate_name,
          id:data[j].cate_slug
        });
      }

    }
console.log(firstCate);
    for(var m=0;m<firstCate.length;m++){
      for(var z=0;z<data.length;z++){
        console.log(1);
        if(firstCate[m].id===data[z].cate_parent){
          firstCate.splice(m+1,0,{
            name:''+'└'+data[z].cate_name,
            id:data[z].cate_slug
          });

        }

      }
    }
    console.log(firstCate);
    // for(var i=0;i<data.length;i++){
    //   dataFormat.push({
    //     name:data[i].cate_name,
    //     id:data[i].cate_slug
    //   });
    // }
    firstCate.unshift({
      name:'无',
      id:''
    });
    /*
     * 设置默认值
     * */
    $scope.cateParentOptions = firstCate;
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