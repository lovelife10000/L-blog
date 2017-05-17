/**
 * Created by v_lljunli on 2017/5/17.
 */
app.filter('trustHtml', function ($sce) {
  return function (input) {
    return $sce.trustAsHtml(input);
  }
});
//$sce是angularJS自带的安全处理模块，$sce.trustAsHtml(input)方法便是将数据内容以html的形式进行解析并返 回  。