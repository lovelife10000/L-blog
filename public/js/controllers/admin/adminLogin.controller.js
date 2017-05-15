/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 用户登录
 * */
app.controller('adminLogin', ['$scope', '$http', 'adminLoginService', function ($scope,$http, adminLoginService) {

  $scope.login = function () {
    adminLoginService.get($scope.adminUser_username,$scope.adminUser_password).then(function success(res) {
      if (res.data.code === 1) {
        window.location.href = '/admin/manage';
      }
    }, function error(res) {

    });



  };

}]);