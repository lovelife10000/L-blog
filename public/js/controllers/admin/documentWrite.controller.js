/**
 * Created by v_lljunli on 2017/4/27.
 */
/*
 * 写文章
 * */
app.controller('articlesAdd', ['$scope', '$http','documentWriteService', function ($scope, $http,documentWriteService) {


  $scope.documentWrite = function () {

    if(myForm.$valid){
      var postContent = '';
      ue.ready(function () {
        postContent = ue.getContent();
        console.log(postContent);
      });


      documentWriteService.get(
        $scope.post_title,
        $scope.post_title,
        $scope.post_from,
        $scope.post_display,
        $scope.post_tags,
        $scope.post_img,
        $scope.cate_parent,
        $scope.post_keywords,
        $scope.post_discription,
        $scope.post_type,
        $scope.post_view,
        $scope.post_author,
        $scope.post_content).then(function success(res) {

      },function error(res) {

      });
    }


  };
}]);