/**
 * Created by v_lljunli on 2017/5/10.
 */

app.factory('passwordModifyService', ['$http', function ($http) {
  return {
    get: function (password,repassword) {

      return $http({
        method: 'POST',
        url:  '/admin/manage/panel/password_modify',
        data: $.param({
          adminUser_password: password,
          adminUser_repassword: repassword
        }),
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      });
    },

  }
}]);