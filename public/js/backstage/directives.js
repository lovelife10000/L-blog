/**
 * Created by v_lljunli on 2017/4/25.
 */
/*
* L-blog 自定义指令
* */

//确认密码一致校验
app.directive('pwCheck', [function () {
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

//angular文件上传功能
app.directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, ngModel) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        element.bind('change', function(event){
          scope.$apply(function(){
            modelSetter(scope, element[0].files[0]);
          });
          //附件预览
          scope.file = (event.srcElement || event.target).files[0];
          scope.getFile();
        });
      }
    };
  }]);