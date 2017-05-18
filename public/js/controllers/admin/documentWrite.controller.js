/**
 * Created by v_lljunli on 2017/4/27.
 */
/*
 * 写文章
 * */
app.controller('documentWrite', ['$scope', '$http','documentWriteService','categoriesAllService', function ($scope, $http,documentWriteService,categoriesAllService) {

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
          cate_parent:data[j].cate_parent,
        });
      }

    }

    for(var m=0;m<dataFormat.length;m++){
      for(var z=0;z<data.length;z++){

        if(dataFormat[m].id===data[z].cate_parent){
          dataFormat.splice(m+1,0,{
            name:data[z].cate_name,
            id:data[z].cate_slug,
            cate_name:data[z].cate_name,
            cate_slug:data[z].cate_slug,
            cate_parent:data[z].cate_parent,
          });

        }

      }
    }

    /*
     * 设置默认值
     * */
    $scope.cateOptions = dataFormat;
    $scope.post_category = $scope.cateOptions[1].id;
  },function error(res) {

  });

  $scope.post_display = {
    name: '1'
  };
  $scope.post_type = {
    name: 'post'
  };
  $scope.documentWrite = function () {



    if($scope.myForm.$valid){
      var postContent = '';
      ue.ready(function () {
        postContent = ue.getContent();
        $scope.post_content=postContent;

      });


      documentWriteService.get(
        $scope.post_title,
        $scope.post_from,
        $scope.post_display.name,
        $scope.post_tags,
        $scope.post_img,
        $scope.post_category,
        $scope.post_keywords,
        $scope.post_abstract,
        $scope.post_type.name,
        $scope.post_view,
        $scope.post_author,
        $scope.post_content).then(function success(res) {

      },function error(res) {

      });
    }


  };
}]);