<template>
  <router-link to="/manageIndex/markdown">
    <el-button type="primary">新增文章</el-button>
  </router-link>
  <el-table :data="tableData">
    <el-table-column type="index" label="序号" width="120"> </el-table-column>
    <el-table-column prop="title" label="标题"> </el-table-column>
    <el-table-column prop="date" label="日期" width="140"> </el-table-column>
    <el-table-column label="操作" width="200">
      <el-button type="primary">编辑</el-button>
      <el-button type="danger">删除</el-button>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
  import { defineComponent, toRefs, reactive } from 'vue'

  export default defineComponent({
    name: 'blogArticle',
    props: {},
    components: {},
    setup() {
      const state = reactive({
        tableData: [
          {
            date: '2016-05-02',
            title: 'http和https的区别',
          },
          {
            date: '2016-05-02',
            title: 'http和https的区别',
          },
          {
            date: '2016-05-02',
            title: 'http和https的区别',
          },
        ],
      })
      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style scoped lang="scss"></style>
