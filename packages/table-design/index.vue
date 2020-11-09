<template>
  <div class="w-full h-full">
    <div
      class="w-auto h-48 rounded-md p-3 text-sm border-solid border border-black m-2 overflow-hidden"
    >
      <avue-crud :option="demoOption" :data="demoData" class="scale-50" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonDefineModule",
  data() {
    return {
      demoOption: {
        column: [
          { label: "a", prop: "a", type: "input" },
          { label: "b", prop: "b", type: "year" },
        ],
      },
      demoData: [{"a":"于刚","b":"傅洋"},{"a":"阎强","b":"邵超"},{"a":"叶娟","b":"徐强"},{"a":"卢勇","b":"戴磊"},{"a":"杨芳","b":"锺军"},{"a":"胡平","b":"郝静"},{"a":"沈娜","b":"蔡杰"},{"a":"李杰","b":"毛强"},{"a":"乔静","b":"叶平"},{"a":"侯军","b":"马磊"}],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
