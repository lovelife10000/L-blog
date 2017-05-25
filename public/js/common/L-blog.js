/**
 * Created by v_lljunli on 2017/5/10.
 */
var app = angular.module('myApp', ['ngSanitize']);
app.factory('adminLoginService', ['$http', function ($http) {
  return {
    get: function (username,password) {
      console.log(2);
      return $http({
        method: 'POST',
        url:  '/admin/login',
        data: $.param({
          adminUser_username: username,
          adminUser_password: password
        }),
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      });
    },
    find:function () {
      console.log(3);
    },
  }
}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('categoriesAddService', ['$http', function ($http) {
  return {
    get: function (cate_name, cate_slug, cate_order, cate_parent, cate_remark) {
      console.log(cate_name);
      console.log(cate_slug);
      console.log(cate_order);
      console.log(cate_parent);
      console.log(cate_remark);
      return $http({
        method: 'POST',
        url: 'add',
        data: $.param({
          cate_name: cate_name,
          cate_slug: cate_slug,
          cate_order: cate_order,
          cate_parent: cate_parent,
          cate_remark: cate_remark
        }),
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      });
    },


  };
}]);
/**
 * Created by v_lljunli on 2017/5/17.
 */
app.factory('categoriesAllService',['$http',function ($http) {
  return{
    get:function (title,from,display,tags,img,parent,keywords,discription,type,view,author,content) {
      $http({
        method:'POST',
        url:'admin/manage/articles_add',
        data:$.param({
          post_title:title,
          post_from:from,
          post_display:display,
          post_tags:tags,
          post_img:img,
          cate_parent:parent,
          post_keywords:keywords,
          post_discription:discription,
          post_type:type,
          post_view:view,
          post_author:author,
          post_content:content
        }),
        headers:{'content-type':'applicatin/x-www-form-urlencoded'}
      });
    },

    /*
     * 获取所有分类数据
     * */
    getCategories: function () {
      return $http({
        method: 'GET',
        url: '/admin/manage/document_manage/categories_manage/get',
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      });
    },



  };
}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('documentAllService',['$http',function ($http) {
  return{
    get:function () {
      return $http({
        method:'GET',
        url:'/admin/manage/document_manage/get_all_document',
        headers:{'content-type':'application/x-www-form-urlencoded'}
      });
    },

  };
}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('documentWriteService',['$http',function ($http) {
  return{
    get:function (title,from,display,hot,recommend,tags,img,category,keywords,abstract,type,view,author,content) {
      return $http({
        method:'POST',
        url:'/admin/manage/document_manage/write',
        data:$.param({
          post_title:title,
          post_from:from,
          post_display:display,
          post_hot:hot,
          post_recommend:recommend,
          post_tags:tags,
          post_img:img,
          post_category:category,
          post_keywords:keywords,
          post_abstract:abstract,
          post_type:type,
          post_view:view,
          post_author:author,
          post_content:content
        }),
        headers:{'content-type':'application/x-www-form-urlencoded'}
      });
    },

  };
}]);
/**
 * Created by v_lljunli on 2017/5/15.
 */

app.factory('headerCtrlService', ['$http', function ($http) {
  return {
    logout: function () {

      return $http({
        method:'GET',
        url:'/admin/manage/logout',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
    },



  }
}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */

app.factory('passwordModifyService', ['$http', function ($http) {
  return {
    get: function (password,repassword) {

      return $http({
        method: 'POST',
        url:  '/admin/manage/panel/password_modify',
        data: $.param({
          adminUser_password: password,
          adminUser_repassword: repassword
        }),
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      });
    },

  }
}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('usersService',['$http',function ($http) {
  return {
    get:function () {
      return $http({
        method: 'GET',
        url: 'get',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
    },

  };
}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('usersAddService',['$http',function ($http) {
  return {
    get:function (username,nickname,logo,password,repassword,userGroup,status,phone,email,remark) {
      return $http({
        method: 'POST',
        url: 'add',
        data: $.param({
          adminUser_username: username,
          adminUser_nickname: nickname,
          adminUser_avatar:logo,
          adminUser_password: password,
          adminUser_repassword: repassword,
          adminUser_userGroup: userGroup,
          adminUser_status: status,
          adminUser_phone: phone,
          adminUser_email: email,
          adminUser_remark: remark
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
    },

  };
}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('usersGroupService', ['$http', function ($http) {
  return {

    /*
     * 获取用户组数据
     * */
    get: function () {
      return $http({
        method: 'GET',
        url: 'users_group_get',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
    },

    /*
     *修改用户组名称及修改用户组权限
     * */
    modify: function (name,power) {
      return $http({
        method: 'POST',
        url: 'users_group/modify_power',
        data:$.param({
          name:name,
          power:power
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
    },

    forbidden:function (name) {
      return $http({
        method: 'POST',
        data:$.param({
          name:name
        }),
        url: 'forbidden',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
    },

    startUsing:function (name) {
      return $http({
        method: 'POST',
        data:$.param({
          name:name
        }),
        url: 'start_using',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
    },




  };
}]);
/**
 * Created by v_lljunli on 2017/5/11.
 */


app.factory('usersGroupAddService', ['$http', function ($http) {
  return {
    get: function (id,name,pid,status,remark) {

      return $http({
        method:'POST',
        url:'users_group_add/add',
        data:$.param({
          group_id:id,
          name:name,
          pid:pid,
          status:status,
          remark:remark
        }),
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
    },


    edit:function (id,name,pid,remark) {
      return $http({
        method:'POST',
        url:'users_group/edit',
        data:$.param({
          group_id:id,
          name:name,
          pid:pid,
          remark:remark
        }),
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
    },

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
 * Created by v_lljunli on 2017/5/17.
 */
app.filter('trustHtml', function ($sce) {
  return function (input) {
    return $sce.trustAsHtml(input);
  }
});
//$sce是angularJS自带的安全处理模块，$sce.trustAsHtml(input)方法便是将数据内容以html的形式进行解析并返 回  。
/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 用户登录
 * */
app.controller('adminLogin', ['$scope', '$http', 'adminLoginService', function ($scope,$http, adminLoginService) {

  $scope.login = function () {
    adminLoginService.get($scope.adminUser_username,$scope.adminUser_password).then(function success(res) {
      if (res.data.code === 1) {

        window.location.href = '/admin/manage';
      }
    }, function error(res) {

    });



  };

}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 添加分类
 * */
app.controller('categoriesAdd', ['$scope', '$http','categoriesAllService','$sce', function ($scope, $http,categoriesAllService,$sce) {

  /*
   * 格式化所有分类数据
   * */
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
        });
      }

    }

    for(var m=0;m<dataFormat.length;m++){
      for(var z=0;z<data.length;z++){
        console.log(1);
        if(dataFormat[m].id===data[z].cate_parent){
          dataFormat.splice(m+1,0,{
            name:''+'└'+data[z].cate_name,
            id:data[z].cate_slug,
            cate_name:data[z].cate_name,
            cate_slug:data[z].cate_slug,
          });

        }

      }
    }
    dataFormat.unshift({
      name:'无',
      id:'',
    });

    /*
     * 设置默认值
     * */
    $scope.cateParentOptions = dataFormat;
    $scope.cate_parent = $scope.cateParentOptions[1].id;
  },function error(res) {

  });





  $scope.categoriesAdd = function () {
    if ($scope.myForm.$valid) {
        categoriesAddService.get($scope.cate_name,$scope.cate_slug,$scope.cate_order,$scope.cate_parent,$scope.cate_remark).then(function success(res) {

      }, function error(res) {

      });
    }

  };
}]);
/**
 * Created by v_lljunli on 2017/5/17.
 */
app.controller('categoriesAll', ['$scope', '$http','categoriesAllService', function ($scope,$http,categoriesAllService) {
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
        console.log(1);
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

    $scope.data=dataFormat;
  },function error(res) {

  });


}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */
app.controller('documentAll', ['$scope', '$http','documentAllService', function ($scope, $http,documentAllService) {
  documentAllService.get().then(function success(res) {
    
  },function error(res) {

  });

}]);
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
/**
 * Created by v_lljunli on 2017/5/15.
 */

app.controller('headerCtrl',['$scope','$http','headerCtrlService',function ($scope,$http,headerCtrlService) {
  $scope.logout=function () {

    headerCtrlService.logout().then(function success(res) {
      if(res.data.code===1){
        window.location.href='/admin';
      }
    },function error(res) {

    });
  };
}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */
app.controller('passwordModify', ['$scope', '$http', 'passwordModifyService', function ($scope, $http, passwordModifyService) {

  $scope.passwordModify = function () {
    passwordModifyService.get($scope.adminUser_password,$scope.adminUser_repassword).then(function success(res) {
      if(res.data.code===1){
        $('#password_modify_modal').modal({
          keyboard: true
        });
      }
    }, function error(res) {

    });


  };

}]);
/**
 * Created by v_lljunli on 2017/5/11.
 */


app.controller('usersGroupAdd',['$scope','$http','usersGroupAddService',function($scope,$http,usersGroupAddService) {
  $scope.statusOptions = [
    {name:'启用',id:1},
    {name:'禁用',id:0},
  ];
  $scope.status=$scope.statusOptions[0].id;//设置默认值
  $scope.pidOptions = [
    {name:'无',id:0},
    {name:'超级管理员',id:1},
    {name:'网站管理员',id:2},
    {name:'内容管理员',id:3},
    {name:'投稿员',id:4}
  ];
  $scope.pid=$scope.pidOptions[0].id;//设置默认值

  $scope.addAdminUserGroup=function () {
    var name=$scope.name;
    var pid=$scope.pid;
    var status=$scope.status;
    var remark=$scope.remark;
    var group_id='超级管理员';
    switch (name){
      case '超级管理员':
        group_id=1;
        break;
      case '网站管理员':
        group_id=2;
        break;
      case '内容管理员':
        group_id=3;
        break;

    }
    usersGroupAddService.get(group_id,name,pid,status,remark).then(function(res) {
      if(res.data.code==1){
        $('#myModal').modal({
          keyboard: true
        });
      }
    },function(res) {

    });
  };

  $('#myModal').on('hidden.bs.modal', function () {
    window.location = "/admin/users_group"
  });
  $('#myModal').on('hide.bs.modal', function () {
    window.location = "/admin/users_group"
  });
}]);

/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 所有用户
 * */
app.controller('users', ['$scope', '$http','usersService', function ($scope, $http,usersService) {
  usersService.get().then(function success(res) {
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
app.controller('usersAdd', ['$scope','$http','usersAddService',function ($scope, $http,usersAddService) {

  /*
   * 提交数据
   * */
  $scope.addAdminUser = function () {

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


    if ($scope.myForm.$valid) {
        usersAddService.get($scope.adminUser_username,$scope.adminUser_nickname,$scope.logo,$scope.adminUser_password,$scope.adminUser_repassword,adminUser_userGroup,$scope.adminUser_status,$scope.adminUser_phone,$scope.adminUser_email,$scope.adminUser_remark).then(function (res) {

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
        url: 'add',
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

  $scope.logo = '/upload/images/defaultlogo.png';

  $('#adminUser_avatar').uploadify({

    'swf': '/plugins/uploadify/uploadify.swf',//指定swf文件
    'uploader': '/admin/manage/users_manage/upload' + '?adminId=' + 'adminUser_username' + '&type=' + 'images' + '&key=' + 'adminUser_avatar',//后台处理的页面
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
      $scope.logo= data;

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
/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 所有用户组
 * */
app.controller('usersGroup', ['$scope', '$http', 'usersGroupService','usersGroupAddService', function ($scope, $http, usersGroupService,usersGroupAddService) {

  getUserGroup();

  /*
   * ztree插件配置
   * */
  var setting = {
    check: {
      enable: true,
      chkStyle: "checkbox",
      chkboxType: { "Y" : "ps", "N" : "ps" }
    },
    data: {
      simpleData: {
        enable: true
      }
    },
    callback: {

    }
  };
  var zNodes = [
    {
      id:'panel', pId:0,name: "仪表盘", open: true,
      children: [
        {id:'panel_index', pId:'panel',name: "仪表盘首页",},
        {id:'basic_info', pId:'panel',name: "基本信息"},
        {id:'password_modify', pId:'panel',name: "修改密码"},

      ]
    },
    {
      id:'users_manage', pId:0,name: "用户管理", open: true,
      children: [
        {
          id:'users_group_manage', pId:'usersManage',name: "用户组管理",
          children: [
            {id:'users_group', pId:'users_group_manage',name: "所有用户组"},
            {id:'users_group_add', pId:'users_group_manage',name: "添加用户组"},

          ]
        },
        {id:'users', pId:'usersManage',name: "所有用户"},
        {id:'users_add', pId:'usersManage',name: "添加用户"},


      ]
    },
    {
      id:'document_manage', pId:0,name: "文档管理",open: true,
      children: [
        {
          id:'categories_manage', pId:'document_manage',name: "分类管理", open: true,
          children: [
            {id:'document_categories', pId:'categories_manage',name: "文档分类"},
            {id:'document_categories_add', pId:'categories_manage',name: "添加分类"},

          ]
        },
        {
          id:'menu_manage', pId:'document_manage',name: "菜单管理",
          children: [
            {id:'menu_edit', pId:'menu_manage',name: "编辑菜单"},
            {id:'menu_location', pId:'menu_manage',name: "菜单位置"},

          ]
        },
        {
          id:'post_manage', pId:'document_manage',name: "文章管理",
          children: [
            {id:'post_write', pId:'post_manage',name: "写文章"},
            {id:'posts', pId:'post_manage',name: "所有文章"},
            {id:'post_wait', pId:'post_manage',name: "待审核"},
            {id:'post_no_access', pId:'post_manage',name: "未通过"},
            {id:'post_published', pId:'post_manage',name: "已发布"},
            {id:'post_draft', pId:'post_manage',name: "草稿箱"},
            {id:'post_recycle', pId:'post_manage',name: "回收站"},

          ]
        },


        {id:'tags_manage', pId:'document_manage',name: "标签管理"},
        {id:'comments_manage', pId:'document_manage',name: "评论管理"},
        {id:'messages_manage', pId:'document_manage',name: "消息管理"},


      ]
    },
    {
      id:'files_manage', pId:0,name: "文件管理",open: true,
      children: [
        {id:'media_manage', pId:'files_manage',name: "媒体管理"},
        {id:'files_backup', pId:'files_manage',name: "文件备份"},
        {id:'files_recover', pId:'files_manage',name: "文件恢复"},
      ],
    },
    {
      id:'data_manage', pId:0,name: "数据管理",open: true,
      children: [
        {
          id:'database_manage', pId:'data_manage',name: "数据库管理", open: true,
          children: [
            {id:'database_backup', pId:'data_manage',name: "数据库备份"},
            {id:'database_in', pId:'data_manage',name: "数据库导入"},
            {id:'database_compress', pId:'data_manage',name: "数据库压缩"},
            {id:'database_optimise', pId:'data_manage',name: "数据库优化"},
          ],

        },
        {
          id:'cache_manage', pId:'data_manage',name: "缓存管理", open: true,
          children: [
            {id:'cache_clear', pId:'cache_manage',name: "缓存清理"},
            {id:'cache_settings', pId:'cache_manage',name: "缓存设置"},

          ],

        },
        {
          id:'count_manage', pId:'data_manage',name: "统计管理", open: true,
          children: [
            {id:'data_count', pId:'count_manage',name: "数据统计"},

          ],

        },
      ],
    },
    {
      id:'Custom_center', pId:0,name: "定制中心",open: true,
      children: [
        {id:'theme_manage', pId:'Custom_center',name: "主题管理"},
        {id:'plugins_manage', pId:'Custom_center',name: "插件管理"},
        {id:'hooks_manage', pId:'Custom_center',name: "钩子管理"},
        {id:'ad_manage', pId:'Custom_center',name: "广告管理"},
      ],
    },
    {
      id:'system_settings', pId:0,name: "系统设置",open: true,
      children: [
        {id:'system_log', pId:'system_settings',name: "系统日志"},
        {id:'website_settings', pId:'system_settings',name: "站点设置"},
        {id:'read_settings', pId:'system_settings',name: "阅读设置"},
        {id:'attachment_settings', pId:'system_settings',name: "附件设置"},
        {id:'social_login_settings', pId:'system_settings',name: "社交登录设置"},
        {id:'update_online', pId:'system_settings',name: "在线更新"},
        {id:'system_info', pId:'system_settings',name: "系统信息"},
        {id:'bugs_commit', pId:'system_settings',name: "BUG反馈"},
      ],
    },
  ];
  var code;
  var zTree;
  var zTreeNodeArray=[];
  var zTreeObj={};
  function setCheck() {
    zTree = $.fn.zTree.getZTreeObj("treeDemo"),
      py = $("#py").attr("checked") ? "p" : "",
      sy = $("#sy").attr("checked") ? "s" : "",
      pn = $("#pn").attr("checked") ? "p" : "",
      sn = $("#sn").attr("checked") ? "s" : "",
      type = {"Y": py + sy, "N": pn + sn};
    zTree.setting.check.chkboxType = type;
    showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
  }

  function showCode(str) {
    if (!code) code = $("#code");
    code.empty();
    code.append("<li>" + str + "</li>");
  }

  $(document).ready(function () {
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    setCheck();
    $("#py").bind("change", setCheck);
    $("#sy").bind("change", setCheck);
    $("#pn").bind("change", setCheck);
    $("#sn").bind("change", setCheck);


  });





  /*
  * 获取用户组数据
  * */
  function getUserGroup() {

    usersGroupService.get().then(function success(res) {
      $scope.data = res.data;
    }, function error(res) {

    });

  }


  /*
   * 权限分配提交
   * */
  $scope.powerCommit = function () {

    // console.log(zTree.getChangeCheckedNodes());
    // console.log(zTree.getNodes());
    // console.log(zTree.transformToArray(zTree.getNodes()));
    zTreeNodeArray=zTree.transformToArray(zTree.getNodes());
    for(var i=0; i<zTreeNodeArray.length;i++){
      //zTreeArray.push(zTreeNodeArray[i].id+':'+zTreeNodeArray[i].checked);
       zTreeObj[zTreeNodeArray[i].id]=zTreeNodeArray[i].checked;
    }

    usersGroupService.modify($scope.userGroup,zTreeObj).then(function success(res) {
      if(res.data.code===1){
        $('#users_group_modal').modal('hide');
      }else {

      }
    },function error(res) {

    });

  };
  /*
  *点击权限分配，获取所选择的用户组,并勾选相应的权限
  * */
  $scope.setPower=function (name) {
    console.log(1);
    $scope.userGroup=name;
    var data;
    var power;


    //获取所选择的用户组的权限数据
    usersGroupService.get().then(function success(res) {
      $scope.data = res.data;
      data=$scope.data;
      for(var j=0;j<data.length;j++){
        if(data[j].name==name){
          power=JSON.parse(data[j].power);
        }
      }


      zTreeNodeArray=zTree.transformToArray(zTree.getNodes());



      for (var i=0, l=zTreeNodeArray.length; i < l; i++) {
        zTreeNodeArray[i].checked=trueOrFalse(power[zTreeNodeArray[i].id]);
      }
      // var nodes = zTree.transformTozTreeNodes(zTreeNodeArray);
      // console.log(nodes);
      //console.log(zTreeNodeArray);
      for(var m=0;m<zTreeNodeArray.length;m++){
        zTree.checkNode(zTreeNodeArray[m],zTreeNodeArray[m].checked,  true);
      }



    }, function error(res) {

    });









    function trueOrFalse(data) {
      if(data==='true'){
        data=true;
      }else if(data==='false'){
        data=false;
      }
      return data;
    }




  };

  /*
  * 禁用用户组
  * */
  $scope.forbidden=function (name) {
    usersGroupService.forbidden(name).then(function success() {
      getUserGroup();
    },function error() {

    });
  };

  /*
  * 启用用户组
  * */
  $scope.startUsing=function (name) {
    usersGroupService.startUsing(name).then(function success() {
      getUserGroup();
    },function error() {

    });
  };

  /*
  * 点击编辑
  * */
  $scope.edit=function (user) {
    $scope.user=user;
    $scope.pidOptions = [
      {name:'无',id:0},
      {name:'超级管理员',id:1},
      {name:'网站管理员',id:2},
      {name:'内容管理员',id:3},
    ];
    $scope.pid=$scope.user.pid;//设置默认值
  };
  /*
  * 编辑提交
  * */
  $scope.editCommit=function (user) {
    var name=user.name;
    var pid=user.pid;
    var remark=user.remark;
    var group_id='超级管理员';
    switch (name){
      case '超级管理员':
        group_id=1;
        break;
      case '网站管理员':
        group_id=2;
        break;
      case '内容管理员':
        group_id=3;
        break;
      default:
        group_id=4;


    }
    usersGroupAddService.edit(group_id,name,pid,remark).then(function(res) {
      if(res.data.code===1){
        $('#myModal').modal({
          keyboard: true
        });
      }
    },function(res) {

    });
  };






}]);

