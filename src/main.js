import Vue from 'vue'
import App from './App'
import AvueFormDesign from '../packages/form-design/install';
import AvueUeditor from 'avue-plugin-ueditor'
import router from './router'
import store from './store'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI, { size: 'small' })

Vue.use(window.AVUE)
Vue.use(AvueFormDesign)
Vue.use(AvueUeditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
