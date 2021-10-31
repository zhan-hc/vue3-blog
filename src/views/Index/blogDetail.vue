<template>
  <div class="detail-wrap">
    <nav-header />
    <div class="detail-top">
      <div class="article-info">
        <div class="title">{{articleData.title}}</div>
        <div class="time">
          <i class="iconfont icon-rili">Created {{dayjs(articleData.createTime).format('YYYY-MM-DD')}}</i>
          <i class="iconfont icon-rili">Updated {{dayjs(articleData.updateTime).format('YYYY-MM-DD')}}</i>
        </div>
        <div class="action">
          <span><i class="iconfont icon-eye1"></i>Post View: {{articleData.reading}}</span>
        </div>
      </div>
    </div>
    <div class="detail-content">
      <div class="content-left card" v-html="articleData.content"></div>
      <div class="content-right">
        <author-card />
        <recent-post />
      </div>
    </div>
    
  </div>
</template>

<script>
import { defineComponent, onMounted, provide, reactive, ref, toRefs } from 'vue'
import navHeader from './componets/navHeader.vue'
import authorCard from './componets/authorCard.vue'
import recentPost from './componets/recentPost.vue'
import {useRoute} from 'vue-router'
import {getArticleList} from '@/api/article'
import marked from 'marked'
export default defineComponent({
  name: 'blogDetail',
  props: {
    
  },
  components: {
    navHeader,
    authorCard,
    recentPost
  },
  setup () {
    const route = useRoute()
    const state = reactive({
      articleData: {}
    })
    // ---start navheader配置
    const activeIndex = ref(0)
    const hasIndex = ref(0) //是否是首页
    provide('activeIndex', activeIndex)
    provide('hasIndex', hasIndex)
    // ----end

    onMounted(async () => {
      if (route.query.id) {
        await getBlogArticleList()
      }
    })

    // 获取文章列表
    const getBlogArticleList = () => {
      getArticleList({status: 1}).then(res => {
        if (res.data.code === 200) {
          const {rows} = res.data.data
          state.articleData = rows[0]
          state.articleData.content = marked(rows[0].content)
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
.detail-wrap{
  overflow: auto;
  .detail-top{
    position: relative;
    height: 400px;
    background-image: url('/api/images/1635490370763.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    margin-bottom: 40px;
    &::before {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    content: '';
    }
    .article-info{
      position: absolute;
      top: 65%;
      left: 50%;
      color: #fff;
      transform: translate(-50%,-65%);
      text-align: center;
      .title{
        font-size: 30px;
        margin-bottom: 10px;
      }
      .time{
        margin-bottom: 10px;
        .icon-rili{
          margin-right: 15px;
          &:last-child{
            margin-right: 0;
          }
          &::before{
            margin-right: 5px;
          }
        }
      }
    }
  }
  .detail-content{
    width: 1200px;
  margin: 0 auto;
    display: flex;
    .content-left{
      width: 900px;
      margin-right: 40px;
      padding: 30px;
    }
  }
}
</style>