/**
 * Created by v_lljunli on 2017/5/10.
 */
app.controller('documentAll', ['$scope', '$http','documentAllService', function ($scope, $http,documentAllService) {
  documentAllService.get().then(function success(res) {
    
  },function error(res) {

  });

}]);