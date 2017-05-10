/**
 * Created by v_lljunli on 2017/5/10.
 */
var app = angular.module('myApp', []);
app.factory('adminLoginService', ['$http', function ($http) {
  return {
    get: function (username,password) {
      console.log(2);
      return $http({
        method: 'POST',
        url: 'admin/admin_login',
        data: $.param({
          adminUser_username: username,
          adminUser_password: password
        }),
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      });
    },
    find:function () {
      console.log(3);
    },
  }
}]);