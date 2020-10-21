import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"

import toast from "components/common/toast/"
// npm install fastclick --save
import FastClick from "fastclick"
// npm install vue-lazyload --save
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false

// 创建时间总线
Vue.prototype.$bus = new Vue()

// 安装创建的toast插件
Vue.use(toast)

// 解决移动端点击的300ms延迟问题
FastClick.attach(document.body)

// 安装懒加载的插件
Vue.use(VueLazyLoad,{
  // require可以往js文件中导入图片
  loading:require("./assets/img/common/placeholder.png")
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
