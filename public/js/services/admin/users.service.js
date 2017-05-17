/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('usersService',['$http',function ($http) {
  return {
    get:function () {
      return $http({
        method: 'GET',
        url: 'get',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
    },

  };
}]);