<template>
  <div class="w-full h-full">
    <template v-if="dataList.length">
        <div
          class="compose-component transition-all relative w-auto h-48 rounded-md p-3 text-sm border-solid border border-black m-2 overflow-hidden cursor-pointer overflow-auto hover:border-blue-600"
          v-for="(item,index) in dataList"
          :key="index"
        >
          <div class="block-mask w-full h-full absolute top-0 left-0 z-10 bg-black bg-opacity-75 flex items-center justify-center">
            <el-button size="mini" type="danger" class="h-8" @click="onDeleteComposeOption(item, index)">删除</el-button>
            <el-button size="mini" class="h-8" @click="updateFormConfig(item, index)">应用</el-button>
          </div>
          <avue-form
              ref="form"
              class="preview-form"
              :option="item"
              v-model="widgetModels"></avue-form>
        </div>
    </template>
    <div v-else class="mt-8">
      <NoData />
    </div>
  </div>
</template>


<script>
import NoData from '../components/no-data'
import { composeComponentKey } from '../const'
export default {
  name: "ComposeComponents",
  components: { NoData },
  inject: ["updateEditorFormConfig"],
  data() {
    return {
      widgetModels: {},
      dataList: [
        // demoData
      ],
      delePopVisible: false,
      demoData: {
        column: [
          {
            type: 'title',
            span: 24,
            display: true,
            styles: {
              fontSize: '18px',
              color: '#000'
            },
            labelWidth: '0px',
            value: '标题',
            prop: '1604644354442_50970'
          },
          {
            type: 'input',
            label: '单行文本',
            span: 24,
            display: true,
            prop: '1604891031325_76112'
          }
        ],
        labelPosition: 'left',
        labelSuffix: '：',
        labelWidth: 120,
        gutter: 0,
        menuBtn: true,
        submitBtn: true,
        submitText: '提交',
        emptyBtn: true,
        emptyText: '清空',
        menuPosition: 'center'
      }
    }
  },
  created() {
    this.getStorageConfig();
  },
  methods: {
    getStorageConfig() {
      let config = localStorage.getItem(composeComponentKey)
      if(!config) return 
      this.dataList = JSON.parse(config)
    },
    updateFormConfig(item) {
      this.$confirm('会覆盖当前编辑配置','更新配置').then(()=>{
        this.updateEditorFormConfig(item)
      })
    },
    // 清除单个组合组件配置
    onDeleteComposeOption(item, index) {
      console.log('item, index: ', item, index);
      this.$confirm('删除不可恢复','删除配置').then(()=>{
        this.dataList.splice(index, 1)
        localStorage.setItem(composeComponentKey, JSON.stringify(this.dataList))
      }).catch(() => {

      })
    },
    handlePreviewSubmit() {},
    
  }
}
</script>


<style lang="scss" scoped>
.compose-component{
  .block-mask {
    display: none;
    // display: flex;
  }
  &:hover {
    .block-mask {
      display: flex;
    }
  }
}
</style>
