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
