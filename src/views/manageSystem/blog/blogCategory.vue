<template>
  <el-button type="primary" @click="showDialog = true;status=0">新增分类</el-button>
  <el-input
    style="width:300px;float:right;"
    v-model="params.keyword"
    placeholder="分类查询"
  >
    <template #append>
      <el-button icon="el-icon-search" @click="getListFun()"></el-button>
    </template>
  </el-input>
  <el-table :data="dataList">
    <el-table-column type="index" label="序号" width="120"> </el-table-column>
    <el-table-column prop="categoryName" label="分类"> </el-table-column>
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
        <el-button type="primary" @click="editCategory(scope.row)">编辑</el-button>
        <el-button type="danger"  @click="deleteFun(scope.row, 'categoryName')">删除</el-button>
        <el-button type="success" @click="onlineFun(scope.row, 'categoryName')">{{scope.row.status === 1 ? '下线': '上线'}}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="pag" layout="prev, pager, next" :total="total" :page-size="params.pageSize" @current-change="(page) => handleCurrentChange(page,0)"></el-pagination>
  <el-dialog v-model="showDialog" title="新增分类" width="30%" center>
    <el-form
      ref="CategoryForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="分类名称" prop="categoryName">
        <el-input v-model="ruleForm.categoryName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">Cancel</el-button>
        <el-button type="primary" @click="addOrUpdateCategory"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
  import { addBlogCategory, updateBlogCategory} from '@/api/category'
  import {ElMessage} from 'element-plus'
  import apiFun from '@/use/commonApi'
  import validateFun from '@/use/validate'
  export default defineComponent({
    name: 'blogCategory',
    props: {},
    components: {},
    setup() {
      const showDialog = ref(false)
      const CategoryForm = ref(null)
      const {submitForm} = validateFun()
      const {onlineFun,getListFun,defaultData, deleteFun, handleCurrentChange} = apiFun(2)
      const state = reactive({
        ruleForm: {
          categoryName: '',
          check: 1
        },
        rules: {
          categoryName: [
            {
              required: true,
              message: '请输入分类名称',
              trigger: 'blur',
            },
          ],
        },
        status: 0,// 0是新增1是编辑
        categoryId: null
      })
      onMounted(() => {
        getListFun()
      })
      // 添加分类
      const addOrUpdateCategory = () => {
        submitForm(CategoryForm,
          () => state.status ? updateBlogCategory({...state.ruleForm,id: state.status ? state.categoryId: undefined}) : addBlogCategory(state.ruleForm),
          (res:any) => {
            getListFun()
            state.ruleForm.categoryName = ''
            showDialog.value = false
            ElMessage({
              message: res.msg,
              type: 'success',
            })
          }
        )
      }
      
      // 编辑分类操作
      const editCategory = (row:any) => {
        state.ruleForm.categoryName = row.categoryName
        state.categoryId = row.id
        showDialog.value = true
        state.status = 1
      }


      return {
        ...toRefs(state),
        ...toRefs(defaultData),
        CategoryForm,
        addOrUpdateCategory,
        editCategory,
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
