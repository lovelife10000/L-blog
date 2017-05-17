/**
 * Created by v_lljunli on 2017/5/16.
 */
var install = angular.module('install', []);
//确认密码一致校验
install.directive('pwCheck', [function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pwCheck;
      elem.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          var v = elem.val()===$(firstPassword).val();
          ctrl.$setValidity('pwmatch', v);
        });
      });
    }
  }
}]);


install.controller('protocol', ['$scope', function ($scope) {
  $scope.nextStep = function () {

    if ($scope.protocolForm.protocol.$invalid) {
      alert('对不起，您必须同意协议才能安装');

    } else {
      window.location.href = 'environment_test';
    }

  };
}]);

install.controller('environmentTest', ['$scope', function ($scope) {

  $scope.nextStep = function () {
    window.location.href = 'website_settings';

  };
}]);

install.controller('websiteSettings', ['$scope', '$http', function ($scope, $http) {
  $scope.port=27017;
  $scope.start = function () {
    if ($scope.myForm.$valid) {
      $http({
        method: 'POST',
        url: 'start',
        data: $.param({
          database_path:$scope.database_path,
          database_port:$scope.database_port,
          database_name:$scope.database_name,
          database_username:$scope.database_username,
          database_password:$scope.database_password,
          adminUser_username:$scope.adminUser_username,
          adminUser_password:$scope.adminUser_password,

        }),
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      }).then(function success(res) {
        console.log(res.data.code);
        if(res.data.code===1){
          console.log(111);
          window.location.href='complete';
        }
      },function error(res) {

      });
    }
  };

}]);

// db.createUser(
//   { user: "admin",
//     customData:{description:"superuser"},
// pwd: "admin",
//   roles: [ { role: "readWrite", db: "blog" } ]
// }
// )