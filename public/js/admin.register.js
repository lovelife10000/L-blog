/**
 * Created by v_lljunli on 2017/4/25.
 */
var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope) {

  /*
  * 绑定事件
  * */
  $scope.checkUsername=function (usernmae) {
    var realUsername=$.trim(usernmae);
    if(realUsername==''){
      $scope.error=1;
    }
  };
});