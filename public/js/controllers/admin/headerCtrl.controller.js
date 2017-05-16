/**
 * Created by v_lljunli on 2017/5/15.
 */

app.controller('headerCtrl',['$scope','$http','headerCtrlService',function ($scope,$http,headerCtrlService) {
  $scope.logout=function () {

    headerCtrlService.logout().then(function success(res) {
      if(res.data.code===1){
        window.location.href='/admin';
      }
    },function error(res) {

    });
  };
}]);