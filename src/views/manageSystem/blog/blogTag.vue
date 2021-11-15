<template>
  <el-button type="primary" @click="showDialog = true;status=0">新增标签</el-button>
  <el-input
    style="width:300px;float:right;"
    v-model="params.keyword"
    placeholder="标签名查询"
  >
    <template #append>
      <el-button icon="el-icon-search" @click="getListFun()"></el-button>
    </template>
  </el-input>
  <el-table :data="dataList">
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
        <el-button type="danger"  @click="deleteFun(scope.row, 'tagName')">删除</el-button>
        <el-button type="success" @click="onlineFun(scope.row, 'tagName')">{{scope.row.status === 1 ? '下线': '上线'}}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="pag" layout="prev, pager, next" :total="total" :page-size="params.pageSize" @current-change="(page) => handleCurrentChange(page,0)"></el-pagination>
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

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
  import { addBlogTag, updateBlogTag} from '@/api/tag'
  import {ElMessage} from 'element-plus'
  import apiFun from '@/use/api'
  import validateFun from '@/use/validate'
  export default defineComponent({
    name: 'blogTag',
    props: {},
    components: {},
    setup() {
      const showDialog = ref(false)
      const TagForm = ref(null)
      const {submitForm} = validateFun()
      const {onlineFun,getListFun,defaultData, deleteFun, handleCurrentChange} = apiFun(0)
      const state = reactive({
        ruleForm: {
          tagName: '',
          check: 1
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
        tagId: null
      })
      onMounted(() => {
        getListFun()
      })
      // 添加标签
      const addOrUpdateTag = () => {
        submitForm(TagForm,
          () => state.status ? updateBlogTag({...state.ruleForm,id: state.status ? state.tagId: undefined}) : addBlogTag(state.ruleForm),
          (res:any) => {
            getListFun()
            state.ruleForm.tagName = ''
            showDialog.value = false
            ElMessage({
              message: res.msg,
              type: 'success',
            })
          }
        )
      }
      
      // 编辑标签操作
      const editTag = (row:any) => {
        state.ruleForm.tagName = row.tagName
        state.tagId = row.id
        showDialog.value = true
        state.status = 1
      }


      return {
        ...toRefs(state),
        ...toRefs(defaultData),
        TagForm,
        addOrUpdateTag,
        editTag,
        showDialog,
        onlineFun,
        getListFun,
        deleteFun,
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
