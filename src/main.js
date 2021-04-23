// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios"; //axios统一封装
import qs from "qs";
import animated from 'animate.css' // npm install animate.css --save安装，再引入
Vue.use(animated);
Vue.use(ElementUI);

Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //store保存在组件中，可共享store状态
  components: { App },
  template: '<App/>'
})
