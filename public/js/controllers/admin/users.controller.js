/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 所有用户
 * */
app.controller('users', ['$scope', '$http','usersService', function ($scope, $http,usersService) {
  usersService.get().then(function success(res) {
    $scope.data = res.data;
    console.log($scope.data);
  }, function error(res) {

  });
}]);