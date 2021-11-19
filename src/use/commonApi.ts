// 后台模块 列表|上下线|删除 接口函数复用

import { ref, reactive, toRefs, onMounted } from 'vue'
import {getTagList, onlineBlogTag, deleteBlogTag} from '@/api/tag'
import {getCategoryList, onlineBlogCategory, deleteBlogCategory} from '@/api/category'
import {getArticleList, deleteBlogArticle,onlineBlogArticle} from '@/api/article'
import {ElMessage,ElMessageBox} from 'element-plus'


const typeName = [
  '标签',
  '文章',
  '分类'
]
const onlineApi = [
  onlineBlogTag,
  onlineBlogArticle,
  onlineBlogCategory

 ]
const getListApi = [
getTagList,
getArticleList,
getCategoryList
]

const deleteApi = [
deleteBlogTag,
deleteBlogArticle,
deleteBlogCategory
]

export default function apiFun (type:number) {

  const defaultData = reactive({
    total: 0,
    params: {
      pageSize: 10,
      currentPage: 1,
      keyword: '',
      check: 1
    },
    dataList: []
  })
  
   /**
    * [getListFun 获取列表]
  **/
   function getListFun () {
    getListApi[type](defaultData.params).then((res:any) => {
      if (res.data.code === 200) {
        const data = res.data.data
        defaultData.dataList = data.rows
        defaultData.total = data.count
      }
    })
  }

  /**
    * [onlineFun 上下线操作]
    * @param  {[number]} type [类型]
    * @param  {[name]} type [需要显示删除的字段]]
  **/
   function onlineFun (row: any,name: string) {
    const {id, status} = row
    ElMessageBox.confirm(
    `确认${status === 1 ? '下线': '上线'}${row[name]}${typeName[type]}吗?`,
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ).then(() => {
    onlineApi[type]({id: id,status: !status,check: 1}).then((res:any) => {
        if (res.data.code === 200) {
          ElMessage({
            message: res.data.msg,
            type: 'success',
          })
          getListFun()
        }
      })
    })
    .catch()
  }
  /**
    * [onlineFun 删除操作]
    * @param  {[row]} row [当前行数据]
    * @param  {[name]} type [需要显示删除的字段]]
  **/
  function deleteFun (row:any,name: string)  {
    const {id} = row
    ElMessageBox.confirm(
    `确认删除${row[name]}${typeName[type]}吗?`,
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ).then(() => {
    deleteApi[type]({id: id,check: 1}).then((res:any) => {
        if (res.data.code === 200) {
          ElMessage({
            message: res.data.msg,
            type: 'success',
          })
          getListFun()
        }
      })
    })
    .catch()
  }

  // 换页
  function handleCurrentChange (val:number) {
    defaultData.params.currentPage = val
    getListFun()
  }

  

  return {
    defaultData,
    onlineFun,
    deleteFun,
    getListFun,
    handleCurrentChange
  }
}