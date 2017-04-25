/**
 * Created by v_lljunli on 2017/4/25.
 */
var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {

  /*
  * 绑定事件
  * */
  $scope.checkUsername=function (usernmae) {
    var realUsername=$.trim(usernmae);
    if(realUsername==''){
     return false;
    }else {
      $http({
        method:'POST',
        url:'users_add/add',
        data:{
          adminUser_username:usernmae
        },
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(function(res) {

      },function(res) {

      });
    }
  };
});