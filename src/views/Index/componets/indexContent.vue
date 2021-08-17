<template>
  <div class="content-wrap">
    <div class="content-left">
      <article-item />
    </div>
    <div class="content-right">
      <author-card />
      <recent-post />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import articleItem from './articleItem.vue'
import authorCard from './authorCard.vue'
import recentPost from './recentPost.vue'
export default defineComponent({
  name: '',
  props: {
    
  },
  components: {
    articleItem,
    authorCard,
    recentPost
  },
  setup () {
    return {}
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