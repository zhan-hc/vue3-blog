// 后台模块 列表|上下线|删除 接口函数复用

import { reactive } from 'vue'
import {getCategoryList} from '@/api/category'


export default function categoryFun () {

  const categoryData = reactive({
    categoryList: []
  })
  
   /**
    * [getListFun 获取上线的标签]
  **/
   function getCategoryListFun () {
    getCategoryList({status: 1}).then((res:any) => {
      if (res.data.code === 200) {
        const data = res.data.data
        categoryData.categoryList = data.rows
        console.log(categoryData, 'categoryData')
      }
    })
  }

  

  return {
    categoryData,
    getCategoryListFun
  }
}