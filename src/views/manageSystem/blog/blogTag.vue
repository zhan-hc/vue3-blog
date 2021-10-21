<template>
  <el-button type="primary" @click="showDialog = true">新增标签</el-button>
  <el-table :data="tableData">
    <el-table-column type="index" label="序号" width="120"> </el-table-column>
    <el-table-column prop="title" label="标签名"> </el-table-column>
    <el-table-column prop="date" label="日期" width="140"> </el-table-column>
    <el-table-column label="操作" width="200">
      <el-button type="primary">编辑</el-button>
      <el-button type="danger">删除</el-button>
    </el-table-column>
  </el-table>
  <el-dialog v-model="showDialog" title="新增标签" width="30%" center>
    <el-form
      ref="blogForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="标签名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">Cancel</el-button>
        <el-button type="primary" @click="showDialog = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from 'vue'

  export default defineComponent({
    name: 'blogTag',
    props: {},
    components: {},
    setup() {
      const showDialog = ref(false)
      const state = reactive({
        ruleForm: {
          name: '',
        },
        rules: {
          name: [
            {
              required: true,
              message: '请输入标签名称',
              trigger: 'blur',
            },
          ],
        },
        tableData: [
          {
            date: '2016-05-02',
            title: 'Vue'
          },
          {
            date: '2016-05-02',
            title: 'React'
          },
          {
            date: '2016-05-02',
            title: 'js'
          }
        ]
      })

      return {
        ...toRefs(state),
        showDialog,
      }
    },
  })
</script>

<style scoped lang="scss">
  /deep/ .el-form-item__label {
    width: auto !important;
  }
</style>
