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