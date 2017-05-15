/**
 * Created by v_lljunli on 2017/5/15.
 */
var app2=angular.module('header',[]);
app2.factory('headerCtrlService', ['$http', function ($http) {
  return {
    logout: function () {

      return $http({
        method:'POST',
        url:'/admin/manage/logout',
        // data:$.param({
        //
        // }),
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
    },



  }
}]);