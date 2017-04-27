/**
 * Created by v_lljunli on 2017/4/27.
 */
var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $http) {

  /*
   * 提交数据
   * */
  $scope.addAdminUser = function (valid) {
    console.log(valid);
    if (valid) {
      $http({
        method: 'POST',
        url: 'users_add/add',
        data: $.param({
          adminUser_username: $scope.adminUser_username,
          adminUser_nickname: $scope.adminUser_nickname,
          adminUser_password: $scope.adminUser_password,
          adminUser_repassword: $scope.adminUser_repassword,
          adminUser_userGroup: $scope.adminUser_userGroup,
          adminUser_phone: $scope.adminUser_phone,
          adminUser_email: $scope.adminUser_email,
          adminUser_remark: $scope.adminUser_remark,
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (res) {

      }, function (res) {

      });

      //发送另外一个请求，处理头像的上传
      $http({
        method: 'POST',
        url: 'users_add/add',
        data: $.param({
          adminUser_username: $scope.adminUser_username,
          adminUser_nickname: $scope.adminUser_nickname,
          adminUser_password: $scope.adminUser_password,
          adminUser_repassword: $scope.adminUser_repassword,
          adminUser_userGroup: $scope.adminUser_userGroup,
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
    {name: '超级管理员', id: 2},
    {name: '网站管理员', id: 3},
    {name: '内容管理员', id: 4},
    {name: '投稿员', id: 5}
  ];
  $scope.adminUser_userGroup = $scope.userGroupOptions[0].id;//设置默认值

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

});

$(function () {

  $('#adminUser_avatar').uploadify({

    'swf': '/public/plugins/uploadify/uploadify.swf',//指定swf文件
    'uploader': '/admin/upload' + '?adminId='+'adminUser_username'+'&type='+'images'+'&key='+'adminUser_avatar',//后台处理的页面
    'buttonText': '上传图片',//按钮显示的文字
    'buttonClass': 'uploadify-btn-default',//按钮显示的文字
    'width': 100,//显示的高度和宽度，默认 height 30；width 120
    'height': 30,//显示的高度和宽度，默认 height 30；width 120
    'fileTypeDesc': 'Image Files',//上传文件的类型  默认为所有文件    'All Files'  ;  '*.*'
    'fileTypeExts': '*.gif; *.jpg; *.png',//允许上传的文件后缀
    'sizeLimit': 1024 * 1024 * 1,//上传文件大小限制
    'auto': true,//选择文件后自动上传
    'multi': false,//设置为true将允许多文件上传

    // 'onUploadSuccess' : function(file, data, response) {//上传成功的回调
    //   if(data === 'typeError'){
    //     $.tipsShow({
    //       message : "文件类型不正确，请重试！",
    //       type : 'warning',
    //       callBack : function(){
    //         return;
    //       }
    //     });
    //   }else {
    //     callBack(data);
    //   }
    // },
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


