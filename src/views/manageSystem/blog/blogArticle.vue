<template>
  <router-link to="/manage/markdown">
    <el-button type="primary">新增文章</el-button>
  </router-link>
  <el-table :data="articleList">
    <el-table-column type="index" label="序号" width="120"> </el-table-column>
    <el-table-column prop="title" label="标题"> </el-table-column>
    <el-table-column prop="createTime" label="日期" width="160"> </el-table-column>
    <el-table-column prop="status" label="状态" width="120">
      <template #default="scope">
        <p>{{scope.row.status === 1 ? '上线': '下线'}}</p>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="310">
      <template #default="scope">
        <el-button type="primary" @click="editArticle(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="deleteArticle(scope.row)">删除</el-button>
        <el-button type="success" @click="onlineArticle(scope.row)">{{scope.row.status === 1 ? '下线': '上线'}}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="pag" layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
</template>

<script>
  import { defineComponent, toRefs, reactive, onMounted } from 'vue'
  import {useRouter} from 'vue-router'
  import {getArticleList, deleteBlogArticle,onlineBlogArticle} from '@/api/article'
  import {ElMessageBox, ElMessage} from 'element-plus'
  export default defineComponent({
    name: 'blogArticle',
    props: {},
    components: {},
    setup() {
      const router = useRouter()
      const state = reactive({
        params: {
          pageSize: 10,
          currentPage: 1,
          tagName: ''
        },
        articleList: []
      })
      onMounted(() => {
        getBlogArticleList()
      })
      // 获取文章列表
      const getBlogArticleList = () => {
        getArticleList(state.params).then(res => {
          if (res.data.code === 200) {
            const data = res.data.data
            state.articleList = data.rows
            state.total = data.count
          }
        })
      }
      // 换页
      const handleCurrentChange = (val) => {
        state.params.currentPage = val
        getBlogArticleList()
      }
      const editArticle = (id) => {
        router.push({
          name: 'markdown',
          query: {
            id: id
          }
        })
      }
      // 删除文章
      const deleteArticle = (row) => {
        const {id, title} = row
        ElMessageBox.confirm(
        `确认删除${title}文章吗?`,
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      ).then(() => {
          deleteBlogArticle({id: id}).then(res => {
            if (res.data.code === 200) {
              ElMessage({
                message: res.data.msg,
                type: 'success',
              })
              getBlogArticleList()
            }
          })
        })
        .catch()
      }

      // 上下线
      const onlineArticle = (row) => {
        const {id, status, title} = row
        ElMessageBox.confirm(
        `确认${status === 1 ? '下线': '上线'}【${title}】文章吗?`,
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      ).then(() => {
          onlineBlogArticle({id: id,status: !status}).then(res => {
            if (res.data.code === 200) {
              ElMessage({
                message: res.data.msg,
                type: 'success',
              })
              getBlogArticleList()
            }
          })
        })
        .catch()
      }
      return {
        ...toRefs(state),
        editArticle,
        getArticleList,
        deleteArticle,
        onlineArticle,
        handleCurrentChange
      }
    },
  })
</script>

<style scoped lang="scss">
.pag{
    text-align: center;
    margin-top: 20px;
  }
</style>
