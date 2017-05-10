/**
 * Created by v_lljunli on 2017/5/10.
 */
var app = angular.module('myApp', []);
/*
 * 所有用户
 * */
app.controller('users', ['$scope', '$http', function ($scope, $http) {
  $http({
    method: 'GET',
    url: 'users2',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(function success(res) {
    $scope.data = res.data;
    console.log($scope.data);
  }, function error(res) {

  });
}]);