<template>
  <div class="flex flex-col justify-center align-center ">
    <img :src="imgUrl" alt="暂无数据">
    <p class="mt-4 text-center text-sm">暂无数据</p>
  </div>
</template>


<script>
import widgetEmpty from '../assets/widget-empty.png'
export default {
  name: "NoData",
  data() {
    return {
      imgUrl: widgetEmpty
    }
  },
  methods: {
    
  }
}
</script>


<style lang="scss" scoped>
</style>
