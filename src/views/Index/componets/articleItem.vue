<template>
  <div class="article-wrap">
    <div class="article-item card" v-for="item in data" :key="item.id">
      <div class="article-img">
        <img :src="`http://192.168.1.102:3000/images/${item.pageImage}`" alt="">
      </div>
      <div class="article-info">
        <div class="title">{{item.title}}</div>
        <div class="time"><i class="iconfont icon-rili"></i> {{item.createTime}}</div>
        <div class="desc">{{item.desc}}</div>
        <div class="action">
          <span><i class="iconfont icon-eye1"></i>{{item.reading}}</span>
          <span><i class="iconfont icon-dianzan_active"></i>{{item.star}}</span>
          <span><i class="iconfont icon-pinglun1"></i>20</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, inject } from 'vue'
export default defineComponent({
  name: '',
  props: {
    
  },
  components: {
  },
  setup () {
    const data  = inject('articleList')
    return {
      data
    }
  }
})
</script>

<style scoped lang='scss'>
@import '@/assets/scss/mixins/mixins.scss';
.article-wrap{
  .article-item{
    display: flex;
    height: 280px;
    .article-img{
      width: 350px;
      height: 100%;
      background-color: #196a73;
      border-radius: 12px 0 0 12px;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        border-radius: 12px 0 0 12px;
        transition: all 0.5s ease;
        &:hover{
          transform: scale(1.1);
        }
      }
    }
    .article-info{
      position: relative;
      flex: 1;
      padding: 30px;
      .title{
        font-size: 24px;
        margin-bottom: 15px;
      }
      .time{
        margin-bottom: 15px;
      }
      .desc{
        @include ellipsisBasic(6);
      }
      .action{
        position: absolute;
        bottom: 30px;
        left: 40px;
        span{
          margin-right: 20px;
          i{
            margin-right: 5px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 850px) {
  .article-wrap{
    padding: 0 25px;
    margin: 0 auto;
    .article-item{
      height: auto;
      display: block;
      .article-img{
        display: none;
      }
      .article-info{
        padding: 10px 20px;
        .title{
          font-size: 22px;
          margin-bottom: 10px;
        }
        .desc{
          display: none;
        }
        .time{
          position: absolute;
          right: 20px;
        }
        .action{
          position: relative;
          display: block;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
}

</style>