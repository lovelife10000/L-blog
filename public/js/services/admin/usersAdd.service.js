/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('usersAddService',['$http',function ($http) {
  return {
    get:function (username,nickname,logo,password,repassword,userGroup,status,phone,email,remark) {
      return $http({
        method: 'POST',
        url: 'add',
        data: $.param({
          adminUser_username: username,
          adminUser_nickname: nickname,
          adminUser_avatar:logo,
          adminUser_password: password,
          adminUser_repassword: repassword,
          adminUser_userGroup: userGroup,
          adminUser_status: status,
          adminUser_phone: phone,
          adminUser_email: email,
          adminUser_remark: remark
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
    },

  };
}]);