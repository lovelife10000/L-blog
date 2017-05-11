/**
 * Created by v_lljunli on 2017/5/10.
 */
var app = angular.module('myApp', []);
app.factory('adminLoginService', ['$http', function ($http) {
  return {
    get: function (username,password) {
      console.log(2);
      return $http({
        method: 'POST',
        url: 'admin/admin_login',
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
app.factory('articlesAddService',['$http',function ($http) {
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

  };
}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('categoriesAddService',['$http',function ($http) {
  return{
    get:function (cate_name,cate_slug,cate_order,cate_parent,cate_remark) {
      return $http({
        method: 'POST',
        url: 'articles_categories_add',
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

    /*
    * 获取所有分类数据
    * */
    getCategories:function () {
      return $http({
        method:'GET',
        url:'articles_manage/categories_get',
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      });
    },

  };
}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */
app.factory('usersService',['$http',function ($http) {
  return {
    get:function () {
      return $http({
        method: 'GET',
        url: 'users_get',
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
    get:function (username,nickname,password,repassword,userGroup,status,phone,email,remark) {
      return $http({
        method: 'POST',
        url: 'admin/users_add/add',
        data: $.param({
          adminUser_username: username,
          adminUser_nickname: nickname,
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
        url: 'users_group_modify',
        data:$.param({
          name:name,
          power:power
        }),
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
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 用户登录
 * */
app.controller('adminLogin', ['$scope', '$http', 'adminLoginService', function ($scope,$http, adminLoginService) {

  $scope.login = function () {
    adminLoginService.get($scope.adminUser_username,$scope.adminUser_password).then(function success(res) {
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
app.controller('articlesAdd', ['$scope', '$http','articlesAddService', function ($scope, $http,articlesAddService) {


  $scope.articleAdd = function () {

    if(myForm.$valid){
      var postContent = '';
      ue.ready(function () {
        postContent = ue.getContent();
        console.log(postContent);
      });


      articlesAddService.get(
        $scope.post_title,
        $scope.post_title,
        $scope.post_from,
        $scope.post_display,
        $scope.post_tags,
        $scope.post_img,
        $scope.cate_parent,
        $scope.post_keywords,
        $scope.post_discription,
        $scope.post_type,
        $scope.post_view,
        $scope.post_author,
        $scope.post_content).then(function success(res) {

      },function error(res) {

      });
    }


  };
}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 添加分类
 * */
app.controller('categoriesAdd', ['$scope', '$http','categoriesAddService', function ($scope, $http,categoriesAddService) {
  $scope.cateParentOptions = [
    {name: '无', id: 0},
    {name: '一级分类', id: 1},
    {name: '二级分类', id: 2},
    {name: '三级分类', id: 3},

  ];
  $scope.cate_parent = $scope.cateParentOptions[1].id;//设置默认值
  /*
   * 获取所有分类数据
   * */
  categoriesAddService.getCategories().then(function success(res) {
    console.log(res.data);
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
      case '投稿员':
        group_id=4;
        break

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
  $scope.addAdminUser = function (valid) {

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
        usersAddService.get($scope.adminUser_username,$scope.adminUser_nickname,$scope.adminUser_password,$scope.adminUser_repassword,adminUser_userGroup,$scope.adminUser_status,$scope.adminUser_phone,$scope.adminUser_email,$scope.adminUser_remark).then(function (res) {

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

}]);
/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 所有用户 组
 * */
app.controller('usersGroup', ['$scope', '$http', 'usersGroupService', function ($scope, $http, usersGroupService) {
  usersGroupService.get().then(function success(res) {
    $scope.data = res.data;
  }, function error(res) {

  });

  /*
   * 权限分配
   * */
  $scope.setPower = function () {
    console.log($scope.userGroup);


  };
  /*
  *获取用户组
  * */
  $scope.getUserGroup=function (name) {

    $scope.userGroup=name;

  };


  /*
   * ztree
   * */
  var setting = {
    check: {
      enable: true,
      chkboxType: {"Y": "p", "N": "s"}
    },
    data: {
      simpleData: {
        enable: true
      }
    }
  };

  var zNodes = [
    {
      name: "仪表盘", open: true,
      children: [
        {name: "仪表盘首页"},
        {name: "基本信息"},
        {name: "修改密码"},

      ]
    },
    {
      name: "用户管理", open: true,
      children: [
        {
          name: "用户组管理",
          children: [
            {name: "所有用户组"},
            {name: "添加用户组"},

          ]
        },
        {name: "所有用户"},
        {name: "添加用户"},


      ]
    },
    {
      name: "文档管理",open: true,
      children: [
        {
          name: "分类管理", open: true,
          children: [
            {name: "文档分类"},
            {name: "添加分类"},

          ]
        },
        {
          name: "菜单管理",
          children: [
            {name: "编辑菜单"},
            {name: "菜单位置"},

          ]
        },
        {
          name: "文章管理",
          children: [
            {name: "写文章"},
            {name: "所有文章"},
            {name: "待审核"},
            {name: "未通过"},
            {name: "已发布"},
            {name: "草稿箱"},
            {name: "回收站"},

          ]
        },


        {name: "标签管理"},
        {name: "评论管理"},
        {name: "消息管理"},


      ]
    },
    {
      name: "文件管理",open: true,
      children: [
        {name: "媒体管理"},
        {name: "文件备份"},
        {name: "文件恢复"},
      ],
    },
    {
      name: "数据管理",open: true,
      children: [
        {
        name: "数据库管理", open: true,
        children: [
          {name: "数据库备份"},
          {name: "数据库导入"},
          {name: "数据库压缩"},
          {name: "数据库优化"},
        ],

      },
        {
          name: "缓存管理", open: true,
          children: [
            {name: "缓存清理"},
            {name: "缓存设置"},

          ],

        },
        {
          name: "统计管理", open: true,
          children: [
            {name: "数据统计"},

          ],

        },
      ],
    },
    {
      name: "定制中心",open: true,
      children: [
        {name: "主题管理"},
        {name: "插件管理"},
        {name: "钩子管理"},
        {name: "广告管理"},
      ],
    },
    {
      name: "系统设置",open: true,
      children: [
        {name: "系统日志"},
        {name: "站点设置"},
        {name: "阅读设置"},
        {name: "附件设置"},
        {name: "社交登录设置"},
        {name: "在线更新"},
        {name: "系统信息"},
        {name: "BUG反馈"},
      ],
    },
  ];


  var code;

  function setCheck() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
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


}]);



// {
//   "_id" : "HyTg8VQUe",
//   "name" : "管理员",
//   "power" : "[\"sysTemManage:true\",\"sysTemManage_user:true\",\"sysTemManage_user_add:true\",\"sysTemManage_user_view:true\",\"sysTemManage_user_modify:true\",\"sysTemManage_user_del:true\",\"sysTemManage_uGroup:true\",\"sysTemManage_uGroup_add:true\",\"sysTemManage_uGroup_view:true\",\"sysTemManage_uGroup_modify:true\",\"sysTemManage_uGroup_del:true\",\"sysTemManage_ads:true\",\"sysTemManage_ads_add:true\",\"sysTemManage_ads_view:true\",\"sysTemManage_ads_modify:true\",\"sysTemManage_ads_del:true\",\"sysTemManage_files:true\",\"sysTemManage_files_view:true\",\"sysTemManage_files_modify:true\",\"sysTemManage_files_del:true\",\"sysTemManage_data:true\",\"sysTemManage_data_1:true\",\"sysTemManage_data_1_view:true\",\"sysTemManage_data_1_backup:true\",\"sysTemManage_data_1_del:true\",\"sysTemManage_logs:true\",\"sysTemManage_logs_view:true\",\"sysTemManage_logs_del:true\",\"contentManage:true\",\"contentManage_content:true\",\"contentManage_content_add:true\",\"contentManage_content_view:true\",\"contentManage_content_top:true\",\"contentManage_content_modify:true\",\"contentManage_content_del:true\",\"contentManage_cateGory:true\",\"contentManage_cateGory_add:true\",\"contentManage_cateGory_view:true\",\"contentManage_cateGory_modify:true\",\"contentManage_cateGory_del:true\",\"contentManage_tag:true\",\"contentManage_tag_add:true\",\"contentManage_tag_view:true\",\"contentManage_tag_modify:true\",\"contentManage_tag_del:true\",\"contentManage_temp:true\",\"contentManage_temp_1:true\",\"contentManage_temp_1_add:true\",\"contentManage_temp_1_import:true\",\"contentManage_temp_1_view:true\",\"contentManage_temp_1_modify:true\",\"contentManage_temp_1_del:true\",\"contentManage_tpItem_add:true\",\"contentManage_tpItem_del:true\",\"contentManage_temp_2:true\",\"contentManage_temp_2_view:true\",\"contentManage_temp_2_modify:true\",\"contentManage_msg:true\",\"contentManage_msg_view:true\",\"contentManage_msg_add:true\",\"contentManage_msg_del:true\",\"contentManage_notice:true\",\"contentManage_notice_1:true\",\"contentManage_notice_1_add:true\",\"contentManage_notice_1_view:true\",\"contentManage_notice_1_modify:true\",\"contentManage_notice_1_del:true\",\"contentManage_notice_2:true\",\"contentManage_notice_2_view:true\",\"contentManage_notice_2_del:true\",\"contentManage_notice_3:true\",\"contentManage_notice_3_view:true\",\"contentManage_notice_3_modify:true\",\"contentManage_notice_3_del:true\",\"userManage:true\",\"userManage_user:true\",\"userManage_user_view:true\",\"userManage_user_modify:true\",\"userManage_user_del:true\"]",
//   "date" : ISODate("2017-01-11T04:35:01.449Z"),
//   "__v" : 0
// }