/**
 * Created by v_lljunli on 2017/4/27.
 */
var app = angular.module('myApp', []);
/*
 * 添加文章
 * */
app.controller('articlesAdd', ['$scope', '$http', function ($scope, $http) {
  $scope.articleAdd = function () {
    var html='';
    ue.ready(function() {
      html = ue.getContent();
      console.log(html);
    });

  };
}]);