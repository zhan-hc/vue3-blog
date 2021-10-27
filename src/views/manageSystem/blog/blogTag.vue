<template>
  <el-button type="primary" @click="showDialog = true;status=0">新增标签</el-button>
  <el-input
    style="width:300px;float:right;"
    v-model="params.tagName"
    placeholder="标签名查询"
  >
    <template #append>
      <el-button icon="el-icon-search" @click="getBlogTagList"></el-button>
    </template>
  </el-input>
  <el-table :data="tagList">
    <el-table-column type="index" label="序号" width="120"> </el-table-column>
    <el-table-column prop="tagName" label="标签名"> </el-table-column>
    <el-table-column prop="status" label="状态">
      <template #default="scope">
        <p>{{scope.row.status === 1 ? '上线': '下线'}}</p>
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="160">
      <template #default="scope">
        {{scope.row.createTime}}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="310">
      <template #default="scope">
        <el-button type="primary" @click="editTag(scope.row)">编辑</el-button>
        <el-button type="danger"  @click="deleteTag(scope.row)">删除</el-button>
        <el-button type="success" @click="onlineTag(scope.row)">{{scope.row.status === 1 ? '下线': '上线'}}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="pag" layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
  <el-dialog v-model="showDialog" title="新增标签" width="30%" center>
    <el-form
      ref="TagForm"
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
        <el-button type="primary" @click="addOrUpdateTag"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
  import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
  import {getTagList, addBlogTag, updateBlogTag, onlineBlogTag, deleteBlogTag} from '@/api/tag'
  import {ElMessage,ElMessageBox} from 'element-plus'
  export default defineComponent({
    name: 'blogTag',
    props: {},
    components: {},
    setup() {
      const showDialog = ref(false)
      const TagForm = ref(null)
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
        status: 0,// 0是新增1是编辑
        total: 0,
        tagId: null,
        params: {
          pageSize: 10,
          currentPage: 1,
          tagName: ''
        },
        keywords: '',
        tagList: []
      })
      onMounted(() => {
        getBlogTagList()
      })
      // 获取标签列表
      const getBlogTagList = () => {
        getTagList(state.params).then(res => {
          if (res.data.code === 200) {
            const data = res.data.data
            state.tagList = data.rows
            state.total = data.count
          }
        })
      }
      // 添加标签
      const addOrUpdateTag = () => {
        const params = {
          tagName: state.ruleForm.tagName
        }
        state.status && (params.id = state.tagId)
        TagForm.value.validate((valid) => {
          if (valid) {
            state.status ? updateBlogTag(params).then(res => { reFresh(res) }) : addBlogTag(params).then(res => { reFresh(res) })
          }
        })
      }
      // 接口返回后的数据刷新
      const reFresh = (res) => {
        if (res.data.code === 200) {
          getBlogTagList()
          state.ruleForm.tagName = ''
          showDialog.value = false
          ElMessage({
            message: res.data.msg,
            type: 'success',
          })
        }
      }
      // 换页
      const handleCurrentChange = (val) => {
        state.params.currentPage = val
        getBlogTagList()
      }
      
      // 编辑标签操作
      const editTag = (row) => {
        state.ruleForm.tagName = row.tagName
        state.tagId = row.id
        showDialog.value = true
        state.status = 1
      }

      // 上下线
      const onlineTag = (row) => {
        const {id, status, tagName} = row
        ElMessageBox.confirm(
        `确认${status === 1 ? '下线': '上线'}${tagName}标签吗?`,
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      ).then(() => {
          onlineBlogTag({id: id,status: !status}).then(res => {
            if (res.data.code === 200) {
              ElMessage({
                message: res.data.msg,
                type: 'success',
              })
              getBlogTagList()
            }
          })
        })
        .catch()
      }

      // 删除标签
      const deleteTag = (row) => {
        const {id, tagName} = row
        ElMessageBox.confirm(
        `确认删除${tagName}标签吗?`,
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      ).then(() => {
          deleteBlogTag({id: id}).then(res => {
            if (res.data.code === 200) {
              ElMessage({
                message: res.data.msg,
                type: 'success',
              })
              getBlogTagList()
            }
          })
        })
        .catch()
      }

      return {
        ...toRefs(state),
        TagForm,
        reFresh,
        addOrUpdateTag,
        editTag,
        deleteTag,
        showDialog,
        onlineTag,
        getBlogTagList,
        handleCurrentChange
      }
    },
  })
</script>

<style scoped lang="scss">
  /deep/ .el-form-item__label {
    width: auto !important;
  }
  .pag{
    text-align: center;
    margin-top: 20px;
  }
</style>
