import Config from '../config'
import FormDesign from '../form-design.vue'

export default {
  install (Vue) {
    Vue.use(Config)
    Vue.component('Avue' + FormDesign.name, FormDesign);
  }
}
