/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 所有用户 组
 * */
app.controller('usersGroup', ['$scope', '$http','usersGroupService', function ($scope, $http,usersGroupService) {
  usersGroupService.get().then(function success(res) {
    $scope.data = res.data;
  }, function error(res) {

  });
}]);