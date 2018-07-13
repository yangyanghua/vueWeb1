import Vue from 'vue';
//初始化在线状态过滤器
Vue.filter('onlineStatusHandler', function (status) {
  if(status == 1){
    return "已下线";
  }else if(status == 2){
    return "待上线";
  }else if(status == 3){
    return "已上线";
  }else if(status == 4){
    return "上线中";
  }else
    return "未知";
});
