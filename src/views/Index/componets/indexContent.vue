<template>
  <div class="content-wrap">
    <div class="content-left">
      <article-item :articleData="articleData.rows"/>
    </div>
    <div class="content-right">
      <author-card :artLen="articleData.count"/>
      <recent-post />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, toRefs, provide, ref } from 'vue'
import articleItem from './articleItem.vue'
import authorCard from './authorCard.vue'
import recentPost from './recentPost.vue'
import {getArticleList} from '@/api/article'
export default defineComponent({
  name: 'indexContent',
  props: {
    
  },
  components: {
    articleItem,
    authorCard,
    recentPost
  },
  setup () {
    // const articleList = ref([])
    // provide('articleList', articleList)
    // cons
    const state = reactive({
      articleData:{}
    })
    onMounted(async () => {
      await getBlogArticleList()
    })

    // 获取文章列表
    const getBlogArticleList = () => {
      getArticleList({status: 1}).then(res => {
        if (res.data.code === 200) {
          state.articleData = res.data.data
        }
      })
    }
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang='scss'>
.content-wrap{
  width: 1200px;
  margin: 40px auto;
  display: flex;
  .content-left{
    width: 900px;
    margin-right: 40px;
  }
  
}
@media screen and (max-width: 850px) {
  .content-wrap{
    width: auto;
    margin: 20px auto;
    .content-left{
      margin-right: 0;
    }
    .content-right{
      display: none;
    }
  }
}
</style>