/**
 * Created by v_lljunli on 2017/4/27.
 */
/*
 * 写文章
 * */
app.controller('documentWrite', ['$scope', '$http','documentWriteService','categoriesAllService', function ($scope, $http,documentWriteService,categoriesAllService) {

  categoriesAllService.getCategories().then(function success(res) {
    var data=res.data;
    var dataFormat=[];

    for(var j=0;j<data.length;j++){
      if(data[j].cate_parent===''){
        dataFormat.push({
          name:data[j].cate_name,
          id:data[j].cate_slug,
          cate_name:data[j].cate_name,
          cate_slug:data[j].cate_slug,
          cate_parent:data[j].cate_parent,
        });
      }

    }

    for(var m=0;m<dataFormat.length;m++){
      for(var z=0;z<data.length;z++){

        if(dataFormat[m].id===data[z].cate_parent){
          dataFormat.splice(m+1,0,{
            name:data[z].cate_name,
            id:data[z].cate_slug,
            cate_name:data[z].cate_name,
            cate_slug:data[z].cate_slug,
            cate_parent:data[z].cate_parent,
          });

        }

      }
    }

    /*
     * 设置默认值
     * */
    $scope.cateOptions = dataFormat;
    $scope.post_category = $scope.cateOptions[1].id;
  },function error(res) {

  });

  $scope.post_display = {
    name: '1'
  };
  $scope.post_hot = {
    name: '1'
  };
  $scope.post_type = {
    name: 'post'
  };
  $scope.post_recommend = {
    name: '0'
  };
  $scope.postImg='/upload/images/defaultlogo.png';
  $scope.documentWrite = function () {



    if($scope.myForm.$valid){
      var postContent = '';
      ue.ready(function () {
        postContent = ue.getContent();
        $scope.post_content=postContent;

      });


      documentWriteService.get(
        $scope.post_title,
        $scope.post_from,
        $scope.post_display.name,
        $scope.post_hot.name,
        $scope.post_recommend.name,
        $scope.post_tags,
        $scope.postImg,
        $scope.post_category,
        $scope.post_keywords,
        $scope.post_abstract,
        $scope.post_type.name,
        $scope.post_view,
        $scope.post_author,
        $scope.post_content).then(function success(res) {

      },function error(res) {

      });
    }


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
      $scope.postImg= data;

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