/**
 * Created by v_lljunli on 2017/4/28.
 */
var fs = require('fs');

var system = {

  /*
   * 获取文件真实类型
   * */
  getFileMimeType: function (filePath) {
    var buffer = new Buffer(8);
    var fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, buffer, 0, 8, 0);
    var newBuf = buffer.slice(0, 4);
    var head_1 = newBuf[0].toString(16);
    var head_2 = newBuf[1].toString(16);
    var head_3 = newBuf[2].toString(16);
    var head_4 = newBuf[3].toString(16);
    var typeCode = head_1 + head_2 + head_3 + head_4;
    var filetype = '';
    var mimetype;
    switch (typeCode) {
      case 'ffd8ffe1':
        filetype = 'jpg';
        mimetype = ['image/jpeg', 'image/pjpeg'];
        break;
      case 'ffd8ffe0':
        filetype = 'jpg';
        mimetype = ['image/jpeg', 'image/pjpeg'];
        break;
      case '47494638':
        filetype = 'gif';
        mimetype = 'image/gif';
        break;
      case '89504e47':
        filetype = 'png';
        mimetype = ['image/png', 'image/x-png'];
        break;
      case '504b34':
        filetype = 'zip';
        mimetype = ['application/x-zip', 'application/zip', 'application/x-zip-compressed'];
        break;
      case '2f2aae5':
        filetype = 'js';
        mimetype = 'application/x-javascript';
        break;
      case '2f2ae585':
        filetype = 'css';
        mimetype = 'text/css';
        break;
      case '5b7bda':
        filetype = 'json';
        mimetype = ['application/json', 'text/json'];
        break;
      case '3c212d2d':
        filetype = 'ejs';
        mimetype = 'text/html';
        break;
      default:
        filetype = 'unknown';
        break;
    }

    fs.closeSync(fd);

    return {
      fileType: filetype,
      mimeType: mimetype
    };
  },
  /*
   * 判断对象是否有非继承属性
   * */
  isOwnEmpty: function (obj) {
    for (var name
      in obj) {
      if (obj.hasOwnProperty(name)) {
        return false;
      }
    }
    return true;
  },

  /*
   * 统一渲染后台模版提供的参数
   * */
  renderItem: function (userInfo, blogName, category, item) {
    return {
      userInfo: userInfo,
      blogName: blogName,
      category: category,
      item: item,
    }
  },

  /*
  * 统一渲染前台模版参数
  * */
  renderFront:function (categories,documentAll,documentHot,documentRecommend,singleDocument) {
    return{
      categories:categories,
      documentAll:documentAll,
      documentHot:documentHot,
      documentRecommend:documentRecommend,
      singleDocument:singleDocument,
    };
  },

  /*
  * 格式化分类数据
  * */
  categoriesFormat:function (cate) {
    var data=cate;
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

    return dataFormat;
  },





};

module.exports = system;