import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


function updateConfig(state, {name, value}) {
  console.log('state: ', state);
  state[name] = value
}

const store = new Vuex.Store({
  state: {
    // 表单配置
    formConfig: {}, // 表单设计 数据
    widgetFormPreview: {}, // 表单预览 数据【和 widgetForm 不一样】
    // 表格配置
    tableConfig: {}, 
    tableConfigPreview: {} // 表格预览
  },
  mutations: {
    updateConfig: updateConfig,
    updateConfigPreviewForm(state, config) {
      updateConfig(state, {
        name: 'widgetFormPreview', 
        value: config
      })
    },
    updateConfigPreviewTable(state, config) {
      updateConfig(state, {
        name: 'tableConfigPreview', 
        value: config
      })
    }
  }
})


export default store