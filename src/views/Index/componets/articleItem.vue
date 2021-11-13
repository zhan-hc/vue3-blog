<template>
  <div class="article-wrap">
    <div class="article-item card" v-for="(item, i) in articleData.rows" :key="item.id" @click="goDetail(item.id)">
      <div class="article-img left" v-show="i%2===0">
        <img :src="`api/images/${item.pageImage}`" alt="">
      </div>
      <div class="article-info">
        <div class="title">{{item.title}}</div>
        <div class="time"><i class="iconfont icon-rili"></i> {{item.createTime}}</div>
        <div class="desc">{{item.desc}}</div>
        <div class="action" :class="i%2!==0 ? 'left' : 'right'">
          <span><i class="iconfont icon-eye1"></i>{{item.reading}}</span>
          <span><i class="iconfont icon-dianzan_active"></i>{{item.star}}</span>
          <span><i class="iconfont icon-pinglun1"></i>20</span>
        </div>
      </div>
      <div class="article-img right"  v-show="i%2!==0">
        <img :src="`api/images/${item.pageImage}`" alt="">
      </div>
    </div>
    <el-pagination class="pag" layout="prev, pager, next" :total="articleData.count" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
  import {useRouter} from 'vue-router'
export default defineComponent({
  name: 'articleItem',
  props: {
    articleData: {
      type: Object,
      default: () => {return {}}
    }
  },
  components: {
  },
  setup (props, context) {
    const router = useRouter()
    const total = ref(0)
    const goDetail = (id) => {
      router.push({name:'blogDetail',query: {id: id}})
    }
    const handleCurrentChange = (val) => {
      context.emit('changePage', val)

    }
    return {
      total,
      goDetail,
      handleCurrentChange
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
      // border-radius: 12px 0 0 12px;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        // border-radius: 12px 0 0 12px;
        transition: all 0.5s ease;
        &:hover{
          transform: scale(1.1);
        }
      }
      &.left{
        border-radius: 12px 0 0 12px;
        img {
          border-radius: 12px 0 0 12px;
        }
      }
      &.right{
        border-radius: 0 12px 12px 0;
        img {
          border-radius: 0 12px 12px 0;
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
        &.left{
          left: 40px;
        }
        &.right{
          right: 40px;
        }
        span{
          margin-right: 20px;
          i{
            margin-right: 5px;
          }
        }
      }
    }
  }
  .el-pagination{
    text-align: center;
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