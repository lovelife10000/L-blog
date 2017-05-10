/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('usersGroupService',['$http',function ($http) {
  return {
    get:function () {
      return $http({
        method: 'GET',
        url: 'users_group_get',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
    },

  };
}]);