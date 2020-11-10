import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


function updateConfig(state, keyname, value) {
  console.log('state: ', state);
  state[keyname] = value
}

const store = new Vuex.Store({
  state: {
    // 表单配置
    widgetForm: {}, // 表单设计 数据
    widgetFormPreview: {}, // 表单预览 数据【和 widgetForm 不一样】
    // 表格配置
    tableConfig: {}, 
    tableConfigPreview: {} // 表格预览
  },
  mutations: {
    updateConfigPreviewForm(state, config) {
      updateConfig(state, 'widgetFormPreview', config)
    },
    updateConfigPreviewTable(state, config) {
      updateConfig(state, 'tableConfigPreview', config)
    }
  }
})


export default store