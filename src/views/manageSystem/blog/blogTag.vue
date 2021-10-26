<template>
  <el-button type="primary" @click="showDialog = true">新增标签</el-button>
  <el-table :data="tagList">
    <el-table-column type="index" label="序号" width="120"> </el-table-column>
    <el-table-column prop="tagName" label="标签名"> </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="140"> </el-table-column>
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
      <el-form-item label="标签名称" prop="tagName">
        <el-input v-model="ruleForm.tagName"></el-input>
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

<script>
  import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
  import {getTagList} from '@/api/tag'
  export default defineComponent({
    name: 'blogTag',
    props: {},
    components: {},
    setup() {
      const showDialog = ref(false)
      const state = reactive({
        ruleForm: {
          tagName: '',
        },
        rules: {
          tagName: [
            {
              required: true,
              message: '请输入标签名称',
              trigger: 'blur',
            },
          ],
        },
        params: {
          pageSize: 10,
          currentPage: 1
        },
        tagList: []
      })
      onMounted(() => {
        getTagList(state.params).then(res => {
          if (res.data.code === 200) {
            const data = res.data.data
            state.tagList = data.rows
          }
        })
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
