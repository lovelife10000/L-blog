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
    console.log(1);

    // $('#myModal').modal({
    //   keyboard: true
    // });
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