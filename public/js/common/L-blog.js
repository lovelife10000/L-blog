/**
 * Created by v_lljunli on 2017/5/10.
 */
var app = angular.module('myApp', []);
/*
 * 用户登录1
 * */
app.controller('adminLogin', ['$scope', '$http', function ($scope, $http) {

  $scope.login = function () {
    $http({
      method: 'POST',
      url: 'admin/admin_login',
      data: $.param({
        adminUser_username: $scope.adminUser_username,
        adminUser_password: $scope.adminUser_password
      }),
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    }).then(function success(res) {
      if (res.data.code === 1) {
        window.location.href = 'admin/manage';
      }
    }, function error(res) {

    });
  };

}]);
/**
 * Created by v_lljunli on 2017/4/27.
 */
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
/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 添加分类
 * */
app.controller('categoriesAdd', ['$scope', '$http', function ($scope, $http) {
  $scope.cateParentOptions = [
    {name: '无', id: 0},
    {name: '一级分类', id: 1},
    {name: '二级分类', id: 2},
    {name: '三级分类', id: 3},

  ];
  $scope.cate_parent = $scope.cateParentOptions[1].id;//设置默认值
  $scope.categoriesAdd = function () {
    if ($scope.myForm.$valid) {
      $http({
        method: 'POST',
        url: 'articles_categories_add',
        data: $.param({
          cate_name: $scope.cate_name,
          cate_slug: $scope.cate_slug,
          cate_order: $scope.cate_order,
          cate_parent: $scope.cate_parent,
          cate_remark: $scope.cate_remark
        }),
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      }).then(function success(res) {

      }, function error(res) {

      });
    }

  };
}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 所有用户
 * */
app.controller('users', ['$scope', '$http', function ($scope, $http) {
  $http({
    method: 'GET',
    url: 'users2',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(function success(res) {
    $scope.data = res.data;
    console.log($scope.data);
  }, function error(res) {

  });
}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 添加用户
 * */
app.controller('usersAdd', function ($scope, $http) {

  /*
   * 提交数据
   * */
  $scope.addAdminUser = function (valid) {
    console.log(valid);
    var adminUser_userGroup = 1;

    switch ($scope.adminUser_userGroup) {
      case 1:
        adminUser_userGroup = '超级管理员';
        break;
      case 2:
        adminUser_userGroup = '网站管理员';
        break;
      case 3:
        adminUser_userGroup = '内容管理员';
        break;
      case 4:
        adminUser_userGroup = '投稿员';
        break;
    }


    if (valid) {
      $http({
        method: 'POST',
        url: 'admin/users_add/add',
        data: $.param({
          adminUser_username: $scope.adminUser_username,
          adminUser_nickname: $scope.adminUser_nickname,
          adminUser_password: $scope.adminUser_password,
          adminUser_repassword: $scope.adminUser_repassword,
          adminUser_userGroup: adminUser_userGroup,
          adminUser_status: $scope.adminUser_status,
          adminUser_phone: $scope.adminUser_phone,
          adminUser_email: $scope.adminUser_email,
          adminUser_remark: $scope.adminUser_remark,
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (res) {

      }, function (res) {

      });


    } else {
      return false;
    }

  };

  $scope.userGroupOptions = [
    {name: '超级管理员', id: 1},
    {name: '网站管理员', id: 2},
    {name: '内容管理员', id: 3},
    {name: '投稿员', id: 4}
  ];
  $scope.adminUser_userGroup = $scope.userGroupOptions[0].id;//设置默认值


  $scope.statusOptions = [
    {name: '启用', id: 1},
    {name: '禁用', id: 0},
  ];
  $scope.adminUser_status = $scope.statusOptions[0].id;//设置默认值

  /*
   * 监听对用户名的输入，判断用户名是否已经存在
   * */

  $scope.checkUsername = function (usernmae) {
    var realUsername = $.trim(usernmae);
    $scope.isUsernameExist = false;
    if (realUsername == '') {
      return false;
    } else {
      $http({
        method: 'POST',
        url: 'users_add/add',
        data: $.param({
          adminUser_username: realUsername
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (res) {
        if (res.data.code == 0) {
          $scope.isUsernameExist = true;
        }
      }, function (res) {

      });
    }
  };

  $scope.logo = '/public/upload/images/defaultlogo.png';

  $('#adminUser_avatar').uploadify({

    'swf': '/public/plugins/uploadify/uploadify.swf',//指定swf文件
    'uploader': '/admin/upload' + '?adminId=' + 'adminUser_username' + '&type=' + 'images' + '&key=' + 'adminUser_avatar',//后台处理的页面
    'buttonText': '上传图片',//按钮显示的文字
    'buttonClass': 'uploadify-btn-default',//按钮显示的文字
    'width': 100,//显示的高度和宽度，默认 height 30；width 120
    'height': 30,//显示的高度和宽度，默认 height 30；width 120
    'fileTypeDesc': 'Image Files',//上传文件的类型  默认为所有文件    'All Files'  ;  '*.*'
    'fileTypeExts': '*.gif; *.jpg; *.png',//允许上传的文件后缀
    'fileSizeLimit': '2000KB',//上传文件大小限制
    'auto': true,//选择文件后自动上传
    'multi': false,//设置为true将允许多文件上传

    'onUploadSuccess': function (file, data, response) {//上传成功的回调
      $("#adminUser_avatar_preview").attr("src", data);
    },
    //
    // 'onComplete': function(event, queueID, fileObj, response, data) {//当单个文件上传完成后触发
    //   //event:事件对象(the event object)
    //   //ID:该文件在文件队列中的唯一表示
    //   //fileObj:选中文件的对象，他包含的属性列表
    //   //response:服务器端返回的Response文本，我这里返回的是处理过的文件名称
    //   //data：文件队列详细信息和文件上传的一般数据
    //   alert("文件:" + fileObj.name + " 上传成功！");
    // },
    //
    // 'onUploadError' : function(file, errorCode, errorMsg, errorString) {//上传错误
    //   alert('The file ' + file.name + ' could not be uploaded: ' + errorString);
    // },
    //
    // 'onError': function(event, queueID, fileObj) {//当单个文件上传出错时触发
    //   alert("文件:" + fileObj.name + " 上传失败！");
    // }


  });

});
/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 所有用户组
 * */
app.controller('usersGroup', ['$scope', '$http', function ($scope, $http) {
  $http({
    method: 'GET',
    url: 'users_group2',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(function success(res) {
    $scope.data = res.data;
  }, function error(res) {

  });
}]);
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


/**
 * Created by v_lljunli on 2017/4/27.
 */
app.factory('fileReader', ["$q", "$log", function($q, $log){
    var onLoad = function(reader, deferred, scope) {
      return function () {
        scope.$apply(function () {
          deferred.resolve(reader.result);
        });
      };
    };

    var onError = function (reader, deferred, scope) {
      return function () {
        scope.$apply(function () {
          deferred.reject(reader.result);
        });
      };
    };

    var getReader = function(deferred, scope) {
      var reader = new FileReader();
      reader.onload = onLoad(reader, deferred, scope);
      reader.onerror = onError(reader, deferred, scope);
      return reader;
    };

    var readAsDataURL = function (file, scope) {
      var deferred = $q.defer();
      var reader = getReader(deferred, scope);
      reader.readAsDataURL(file);
      return deferred.promise;
    };

    return {
      readAsDataUrl: readAsDataURL
    };
  }]);