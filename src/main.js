import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入全局样式
import './styles/index.less'

Vue.config.productionTip = false

// 创建Vue根实例
// 并挂载相应配置
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
