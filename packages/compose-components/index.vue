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
          <template v-if="source == 'form'">
            <avue-form
                ref="form"
                class="preview-form"
                :option="item"
                v-model="widgetModels"></avue-form>
          </template>
          <template v-else>
            <avue-crud :option="item" :data="dataList" class="scale-50" />
          </template>
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
  props: {
    source: {
      type: String, 
      required: true
    }
  },
  data() {
    return {
      widgetModels: {},
      dataList: [
        // demoData_form
      ],
      delePopVisible: false,
      demoData_form: {
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
      },
      // 表格 demo
      demoData_table: [{"a":"于刚","b":"傅洋"},{"a":"阎强","b":"邵超"},{"a":"叶娟","b":"徐强"},{"a":"卢勇","b":"戴磊"},{"a":"杨芳","b":"锺军"},{"a":"胡平","b":"郝静"},{"a":"沈娜","b":"蔡杰"},{"a":"李杰","b":"毛强"},{"a":"乔静","b":"叶平"},{"a":"侯军","b":"马磊"}],
    }
  },
  computed: {
    localKey() {
      const dict = {
        form: 'formConfig', 
        table: 'tableConfig'
      }   
      return dict[this.source]
    },
    storeKey() {
      const dict = {
        form: 'formConfig', 
        table: 'tableConfig'
      }
      return dict[this.source]
    },
    dataSource() {
      return this.$store.state[this.storeKey]
    }
  },
  created() {
    this.getStorageConfig();
  },
  methods: {
    getStorageConfig() {
      let config = localStorage.getItem(composeComponentKey)
      config = JSON.parse(config)
      if(!config || !config[this.localKey]) return 
      this.dataList = config[this.localKey]
    },
    updateFormConfig(item) {
      this.$confirm('会覆盖当前编辑配置','更新配置').then(()=>{
        if(this.source === 'form') {
          this.updateEditorFormConfig(item)
        }
        this.$store.commit('updateConfig', {name: this.storeKey, value: item})
      })
    },
    // 清除单个组合组件配置
    onDeleteComposeOption(item, index) {
      console.log('item, index: ', item, index);
      this.$confirm('删除不可恢复','删除配置').then(()=>{
        this.dataList.splice(index, 1)
        let config = localStorage.getItem(composeComponentKey)
        config = JSON.parse(config)
        config[this.localKey] = this.dataList
        localStorage.setItem(composeComponentKey, JSON.stringify(config))
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
