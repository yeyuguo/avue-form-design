<template>
  <div class="preview-page">
    <!-- 表单 -->
    <avue-form
            ref="form"
            class="preview-form"
            :option="storePreviewConfigForm"
            v-model="formModel"
            @submit="handlePreviewSubmitForm"></avue-form>
    <!-- 表格 -->
    <avue-crud :option="storePreviewConfigTable"
                 :data="codeList()"></avue-crud>
  </div>
</template>


<script>
import { getStore } from '@utils/local-store'
const Mock = require('mockjs')
export default {
  name: "PreviewPage",
  data() {
    return {
      formModel: {},
      list: ""
    }
  },
  computed: {
    // store 里存储的 codeOption
    storePreviewConfigTable() {
      return this.$store.state.tableConfigPreview
    },
    storePreviewConfigForm() {
      return this.$store.state.widgetFormPreview 
    }
  },
  created() {
    this.list = getStore({ name: 'crud_list' }) || [];
  },
  methods: {
    // 获取mock 数据
    codeList() {
      //const Mock = window.Mock;
      const list = getStore({ name: 'crud_list' }) || [];
      for (let i = 0; i < 10; i++) {
        let obj = {};
        list.forEach(ele => {
          let result = '';
          if (ele.type == 'number') {
            result = Mock.mock({
              "number|1-100": 100
            })
          } else {
            result = Mock.mock('@cname');
          }
          obj[ele.prop] = result
        })
        list.push(obj)
      }
      return list
    },
    handlePreviewSubmitForm(form, done) {
      if (done) {
        this.$alert(this.formModel).then(() => {
          done()
        }).catch(() => {
          done()
        })
      } else {
        this.$refs.form.validate((valid, done) => {
          if (valid) this.$alert(this.formModel).then(() => {
            done()
          }).catch(() => {
            done()
          })
        })
      }
    },
  }
}
</script>


<style lang="scss" scoped>
.preview-form {
  height: auto;
}
</style>
