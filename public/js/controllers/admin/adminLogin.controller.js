/**
 * Created by v_lljunli on 2017/5/10.
 */
var app = angular.module('myApp', []);
/*
 * 用户登录1
 * */
app.controller('adminLogin', ['$scope', '$http', function ($scope, $http) {

  $scope.login = function () {
    $http({
      method: 'POST',
      url: 'admin/admin_login',
      data: $.param({
        adminUser_username: $scope.adminUser_username,
        adminUser_password: $scope.adminUser_password
      }),
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }).then(function success(res) {
      if (res.data.code === 1) {
        window.location.href = 'admin/manage';
      }
    }, function error(res) {

    });
  };

}]);