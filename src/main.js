import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入全局样式
import './styles/index.less'
// element 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

// 创建Vue根实例
// 并挂载相应配置
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
