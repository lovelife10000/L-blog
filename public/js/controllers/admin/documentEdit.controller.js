/**
 * Created by v_lljunli on 2017/4/27.
 */
app.controller('documentEdit', ['$scope', '$http', 'documentEditService', 'categoriesAllService','$location', function ($scope, $http, documentEditService, categoriesAllService,$location) {
  var absurl = $location.absUrl();//获取当前链接的url
  var absurlFormat=/admin\/manage\/document_manage\/edit\/[a-z0-9]{24}/.exec(absurl)[0].slice(34,58);//获取_id


  documentEditService.postEditId(absurlFormat).then(function success(res) {
    $scope.data=res.data[0];
    console.log($scope.data);
    $scope.document_title=$scope.data.document_title;
    $scope.document_from=$scope.data.document_from;
    $scope.document_display=$scope.data.document_display;
    $scope.document_hot=$scope.data.document_hot;
    $scope.document_recommend=$scope.data.document_recommend;
    $scope.document_tags=$scope.data.document_tags;
    $scope.document_keywords=$scope.data.document_keywords;
    $scope.document_abstract=$scope.data.document_abstract;
    $scope.document_type=$scope.data.document_type;

  },function error(res) {

  });


  $scope.document_title='1';

  categoriesAllService.getCategories().then(function success(res) {
    var data = res.data;
    var dataFormat = [];

    for (var j = 0; j < data.length; j++) {
      if (data[j].cate_parent === '') {
        dataFormat.push({
          name: data[j].cate_name,
          id: data[j].cate_slug,
          cate_name: data[j].cate_name,
          cate_slug: data[j].cate_slug,
          cate_parent: data[j].cate_parent,
        });
      }

    }

    for (var m = 0; m < dataFormat.length; m++) {
      for (var z = 0; z < data.length; z++) {

        if (dataFormat[m].id === data[z].cate_parent) {
          dataFormat.splice(m + 1, 0, {
            name: data[z].cate_name,
            id: data[z].cate_slug,
            cate_name: data[z].cate_name,
            cate_slug: data[z].cate_slug,
            cate_parent: data[z].cate_parent,
          });

        }

      }
    }

    /*
     * 设置默认值
     * */
    $scope.cateOptions = dataFormat;
    $scope.document_category = $scope.cateOptions[1].id;
  }, function error(res) {

  });

  $scope.document_display = {
    name: '1'
  };
  $scope.document_hot = {
    name: '1'
  };
  $scope.document_type = {
    name: 'post'
  };
  $scope.document_recommend = {
    name: '0'
  };
  $scope.postImg = '/upload/images/defaultlogo.png';

  $('#post_img').uploadify({

    'swf': '/plugins/uploadify/uploadify.swf',//指定swf文件
    'uploader': '/admin/manage/document_manage/upload' + '?postTitle=' + 'post_title' + '&type=' + 'images' + '&key=' + 'post_img',//后台处理的页面
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
      $("#post_img_preview").attr("src", data);
      $scope.postImg = data;

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
}]);