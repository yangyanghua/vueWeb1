// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import "babel-polyfill";
import App from './App';
import ElementUI from 'element-ui'
import '@/assets/css/element/element-variables.scss'
import VueRouter from 'vue-router'
import Format from '@/common/js/time.js'
import Filter from '@/common/js/filters.js'
import jrQrcode  from 'jr-qrcode'
import Util from '@/common/util/util.vue';
import Areaselect from '@/common/plugin/areaSelect/index.js'
import Productselect from '@/common/plugin/productSelect/index.js'
import store from '@/store/index.js';

Vue.use(ElementUI)
Vue.use(VueRouter);
Vue.use(Util);
Vue.use(Productselect);
Vue.use(Areaselect);

import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
CheckInternetExplorer();  
function CheckInternetExplorer() {  
  var browser = navigator.appName;  
  var b_version = navigator.appVersion;  
  var version = b_version.split(";");  
  if (version.length > 1) {  
    var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));  
    if (trim_Version < 10) {  
      alert("检测到您浏览器版本过低，部分功能可能无法正常使用，请先升级您的浏览器。");  
      return false;
    }  
  }  
  return true;
}  