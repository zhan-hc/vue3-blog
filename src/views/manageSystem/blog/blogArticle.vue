<template>
  <router-link to="/manage/markdown">
    <el-button type="primary">新增文章</el-button>
  </router-link>
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
        <el-button type="danger" @click="deleteFun(scope.row,'title')">删除</el-button>
        <el-button type="success" @click="onlineFun(scope.row,'title')">{{scope.row.status === 1 ? '下线': '上线'}}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="pag" layout="prev, pager, next" :total="total"  :page-size="params.pageSize" @current-change="handleCurrentChange"></el-pagination>
</template>

<script lang="ts">
  import { defineComponent, toRefs, reactive, onMounted } from 'vue'
  import {useRouter} from 'vue-router'
  import apiFun from '@/use/commonApi'
  export default defineComponent({
    name: 'blogArticle',
    props: {},
    components: {},
    setup() {
      const {onlineFun,getListFun,defaultData, deleteFun, handleCurrentChange} = apiFun(1)
      const router = useRouter()
      onMounted(() => {
        getListFun()
      })

      const editArticle = (id:number) => {
        router.push({
          name: 'markdown',
          query: {
            id: id
          }
        })
      }

      return {
        ...toRefs(defaultData),
        editArticle,
        onlineFun,
        getListFun,
        deleteFun,
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
