// 后台模块 列表|上下线|删除 接口函数复用

import { reactive } from 'vue'
import {getTagList} from '@/api/tag'


export default function tagFun () {

  const tagData = reactive({
    tagList: []
  })
  
   /**
    * [getListFun 获取上线的标签]
  **/
  function getTagListFun () {
    getTagList({status: 1}).then((res:any) => {
      if (res.data.code === 200) {
        const data = res.data.data
        tagData.tagList = data.rows
      }
    })
  }

  

  return {
    tagData,
    getTagListFun
  }
}