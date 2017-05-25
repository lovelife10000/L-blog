/**
 * Created by v_lljunli on 2017/5/10.
 */
app.controller('documentAll', ['$scope', '$http', 'documentAllService', function ($scope, $http, documentAllService) {

  documentAllService.get(5, 1).then(function success(res) {
    $scope.data = res.data.documentByLimitAndPage;
    $scope.allPage = res.data.allPage;
  }, function error(res) {

  });


  $scope.limit = '5';
  $scope.currentPage=1;
  /*
  * 按条件获取文档数据
  * */
  $scope.getPage = function (limit, page) {
    documentAllService.postLimitAndPage(limit, page).then(function success(res) {
      $scope.data = res.data.documentByLimitAndPage;
      $scope.allPage = res.data.allPage;

    }, function error(res) {

    });
    $scope.currentPage=1;

  };
/*
* 单击跳转页面
* */
  $scope.goToPage=function (limit,page) {
    documentAllService.postLimitAndPage(limit, page).then(function success(res) {
      $scope.data = res.data.documentByLimitAndPage;
      $scope.allPage = res.data.allPage;
      $scope.currentPage=page;
    }, function error(res) {

    });
  };
/*
* 删除单篇文档
* */
$scope.removeOneDocument=function (doc) {
  $scope.oneDocument=doc;
$('#remove_one_document_modal').modal({
  keyboard: true
});
  documentAllService.removeOneDocument(doc).then(function success(res) {
    if(res.data.code===1){

    }
  },function error(res) {

  });
};

}]);