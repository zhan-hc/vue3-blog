<template>
  <div class="recent-wrap card">
    <div class="recent-title">
      <i class="iconfont icon-noun_recent_"></i>
      <span>Recent Post</span>
    </div>
    <div class="recent-item">
      <img class="item-img" src="@/assets/images/bg.gif" alt="">
      <div class="item-info">
        <div class="item-title">http1.0/1.1/2.0区别</div>
        <div class="item-time">2021.08.03</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'recentPost',
  props: {
    
  },
  components: {
    
  },
})
</script>

<style scoped lang='scss'>
@import '@/assets/scss/mixins/mixins.scss';
  .recent-wrap{
    padding: 20px;
    width: 277px;
    .recent-title{
      margin-bottom: 10px;
      i{
        margin-right: 15px;
      }
      span{
        font-size: 18px;
      }
    }
    .recent-item{
      display: flex;
      .item-img{
        width: 60px;
        height: 60px;
        border-radius: 3px;
        margin-right: 15px;
      }
      .item-info{
        flex: 1;
        width: 200px;
        line-height: 30px;
        .item-title{
          @include ellipsis
        }
      }
    }
  }
</style>