/**
 * Created by v_lljunli on 2017/4/27.
 */
app.controller('documentEdit', ['$scope', '$http', 'documentEditService', 'categoriesAllService', '$location', function ($scope, $http, documentEditService, categoriesAllService, $location) {
  var absUrl = $location.absUrl();//获取当前链接的url
  var absUrlFormat = /admin\/manage\/document_manage\/edit\/[a-z0-9]{24}/.exec(absUrl)[0].slice(34, 58);//获取_id

  /*
   * 获取所编辑的文档id，并设置各字段内容
   * */
  documentEditService.postEditId(absUrlFormat).then(function success(res) {
    $scope.data = res.data[0];

    $scope.document_title = $scope.data.document_title;
    $scope.document_from = $scope.data.document_from;
    $scope.document_display = {
      name: String($scope.data.document_display)
    };
    $scope.document_hot = {
      name: String($scope.data.document_hot)
    };
    $scope.document_recommend = {
      name: String($scope.data.document_recommend)
    };
    $scope.document_tags = $scope.data.document_tags;
    $scope.documentImg = $scope.data.document_img;
    console.log($scope.documentImg);
    $scope.document_keywords = $scope.data.document_keywords;
    $scope.document_abstract = $scope.data.document_abstract;
    $scope.document_type = {
      name: String($scope.data.document_type)
    };
    $scope.document_view = $scope.data.document_view;
    $scope.document_author = $scope.data.document_author;

    /*
     * 设置编辑器内容
     * */
    ue.ready(function () {
      ue.setContent($scope.data.document_content, false);
    });

    /*
     * 获取分类，并设置分类
     * */
    categoriesAllService.getCategories().then(function success(res) {
      var data = res.data;
      var dataFormat = [];
      /*
       * 格式化分类数据
       * */
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
       * 设置分类默认值
       * */
      $scope.cateOptions = dataFormat;

      var id = 1;
      for (var i = 0; i < dataFormat.length; i++) {
        if (dataFormat[i].cate_slug == $scope.data.document_category) {
          id = i;

          break;
        }
      }
      $scope.document_category = $scope.cateOptions[id].id;
    }, function error(res) {

    });

  }, function error(res) {

  });

  $scope.updateDocument = function () {
    /*
     * 获取编辑器内容
     * */

    ue.ready(function () {
      $scope.document_content = ue.getContent();
    });
    documentEditService.update(absUrlFormat, $scope.document_title, $scope.document_from, $scope.document_display.name, $scope.document_hot.name, $scope.document_recommend.name, $scope.document_tags, $scope.document_category, $scope.document_keywords, $scope.document_abstract, $scope.document_type.name, $scope.document_view, $scope.document_author, $scope.document_content).then(function success(res) {

    }, function error(res) {

    });
  };

  /*
  * 缩略图上传配置
  * */


  $('#document_img').uploadify({


    'swf': '/plugins/uploadify/uploadify.swf',//指定swf文件
    'uploader': '/admin/manage/document_manage/upload' + '?documentTitle=' + 'document_title' + '&type=' + 'images' + '&key=' + 'document_img'+'&id='+absUrlFormat,//后台处理的页面
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
      //$("#document_img_preview").attr("src", data);
      $scope.documentImg = data;

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