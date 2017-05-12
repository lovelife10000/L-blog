/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 所有用户组
 * */
app.controller('usersGroup', ['$scope', '$http', 'usersGroupService', function ($scope, $http, usersGroupService) {


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
      id:'panel', pId:0,name: "仪表盘", open: true,checked:true,
      children: [
        {id:'panel_index', pId:'panel',name: "仪表盘首页",checked:true,},
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
  var zTreeArray={};
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
  usersGroupService.get().then(function success(res) {
    $scope.data = res.data;
  }, function error(res) {

  });

  /*
   * 权限分配
   * */
  $scope.setPower = function () {

    // console.log(zTree.getChangeCheckedNodes());
    // console.log(zTree.getNodes());
    // console.log(zTree.transformToArray(zTree.getNodes()));
    zTreeNodeArray=zTree.transformToArray(zTree.getNodes());
    for(var i=0; i<zTreeNodeArray.length;i++){
      //zTreeArray.push(zTreeNodeArray[i].id+':'+zTreeNodeArray[i].checked);
       zTreeArray[zTreeNodeArray[i].id]=zTreeNodeArray[i].checked;
    }

    usersGroupService.modify($scope.userGroup,zTreeArray).then(function success(res) {
      
    },function error(res) {

    });

  };
  /*
  *点击权限分配，获取所选择的用户组
  * */
  $scope.getUserGroup=function (name) {
    $scope.userGroup=name;
  };





}]);

