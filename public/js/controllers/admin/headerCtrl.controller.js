/**
 * Created by v_lljunli on 2017/5/15.
 */

app2.controller('headerCtrl',['$scope','$http','headerCtrlService',function ($scope,$http,headerCtrlService) {
  $scope.logout=function () {
    console.log(1);
    headerCtrlService.logout().then(function success(res) {
      
    },function error(res) {

    });
  };
}]);