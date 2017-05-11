/**
 * Created by v_lljunli on 2017/5/10.
 */

/*
 * 所有用户 组
 * */
app.controller('usersGroup', ['$scope', '$http','usersGroupService', function ($scope, $http,usersGroupService) {
  usersGroupService.get().then(function success(res) {
    $scope.data = res.data;
  }, function error(res) {

  });

  /*
  * 权限分配
  * */
  $scope.setPower=function () {
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
      chkboxType: { "Y": "p", "N": "s" }
    },
    data: {
      simpleData: {
        enable: true
      }
    }
  };

  var zNodes =[
    { name:"用户管理", open:true,
      children: [
        { name:"用户组管理",
          children: [
            { name:"新增"},
            { name:"查看"},
            { name:"修改"},
            { name:"删除"}
          ]},
        { name:"用户管理",
          children: [
            { name:"新增"},
            { name:"查看"},
            { name:"修改"},
            { name:"删除"}
          ]},
        { name:"广告管理", isParent:true},
        { name:"文件管理",
          children: [
            { name:"新增"},
            { name:"查看"},
            { name:"修改"},
            { name:"删除"}
          ]},
        { name:"数据管理",
          children: [
            { name:"新增"},
            { name:"查看"},
            { name:"修改"},
            { name:"删除"}
          ]},
        { name:"日志管理",
          children: [
            { name:"新增"},
            { name:"查看"},
            { name:"修改"},
            { name:"删除"}
          ]},
      ]},
    { name:"内容管理",
      children: [
        { name:"文章管理", open:true,
          children: [
            { name:"新增"},
            { name:"查看"},
            { name:"修改"},
            { name:"删除"}
          ]},
        { name:"分类管理",
          children: [
            { name:"新增"},
            { name:"查看"},
            { name:"修改"},
            { name:"删除"}
          ]},
        { name:"标签管理",
          children: [
            { name:"新增"},
            { name:"查看"},
            { name:"修改"},
            { name:"删除"}
          ]},
        { name:"模版管理",
          children: [
            { name:"新增"},
            { name:"查看"},
            { name:"修改"},
            { name:"删除"}
          ]},
        { name:"评论管理",
          children: [
            { name:"新增"},
            { name:"查看"},
            { name:"修改"},
            { name:"删除"}
          ]},
        { name:"消息管理",
          children: [
            { name:"新增"},
            { name:"查看"},
            { name:"修改"},
            { name:"删除"}
          ]}
      ]},
    { name:"会员管理", isParent:true}

  ];



  var code;

  function setCheck() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
      py = $("#py").attr("checked")? "p":"",
      sy = $("#sy").attr("checked")? "s":"",
      pn = $("#pn").attr("checked")? "p":"",
      sn = $("#sn").attr("checked")? "s":"",
      type = { "Y":py + sy, "N":pn + sn};
    zTree.setting.check.chkboxType = type;
    showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
  }
  function showCode(str) {
    if (!code) code = $("#code");
    code.empty();
    code.append("<li>"+str+"</li>");
  }

  $(document).ready(function(){
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    setCheck();
    $("#py").bind("change", setCheck);
    $("#sy").bind("change", setCheck);
    $("#pn").bind("change", setCheck);
    $("#sn").bind("change", setCheck);
  });










}]);