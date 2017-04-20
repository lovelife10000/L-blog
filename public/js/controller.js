/**
 * Created by v_lljunli on 2017/4/17.
 */
var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {
  $scope.register=function (isValid) {
    $scope.username=$scope.username || '';
    $scope.password=$scope.password || '';
    $scope.repassword=$scope.repassword || '';
    if(isValid){
      $http({
        method:'POST',
        data:$.param({
          username:$scope.username,
          password:$scope.password,
          repassword:$scope.repassword
        }),
        url:'api/user/register',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(function success(data) {
        console.log(data);
        console.log(data.data.code);
        if(data.data.code==0){
          $scope.hideOrShow=true;
          $scope.hideOrShow2=false;
        }
      },function error(data) {

      });
    }

  };
  $scope.login=function () {
    $scope.username=$scope.username || '';
    $scope.password=$scope.password || '';
    $http({
      method:'POST',
      url:'api/user/login',
      data:$.param({
        username:$scope.username,
        password:$scope.password
      }),
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function success(data) {

    },function error(data) {

    });
  };

});
