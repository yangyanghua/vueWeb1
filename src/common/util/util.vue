<script>
  import Vue from 'vue';

  //element ui 消息通知，待完成：封装成不定参数
  Vue.prototype.tips = function (_type='error', _message='操作错误'){
    this.$message({
      type: _type,
      message: _message,
    })
  }

  //input获得焦点全选文字
  Vue.prototype.focus = function(e){
    e.currentTarget.select();
  }

  //对象深拷贝
  Vue.prototype.objCopy = function(_obj){
    return JSON.parse(JSON.stringify(_obj))
  }

  //提取字符串中的数字
  Vue.prototype.getPureNum = function(_str){
    return  _str.replace(/[^0-9]/ig,"");
  }

  //简单数组相加
  Vue.prototype.arrSum = function(_arr) {
    return _arr.reduce(function (pre, cur) {
      return parseInt(pre) + parseInt(cur);
    });
};

  

  export default {}
  
</script>