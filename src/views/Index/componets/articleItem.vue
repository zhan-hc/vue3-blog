<template>
  <div class="article-wrap">
    <div class="article-item card">
      <div class="article-img">
        <img src="" alt="">
      </div>
      <div class="article-info">
        <div class="title">收到回复艰苦大师</div>
        <div class="time"><i class="iconfont icon-rili"></i> 2021.03.26</div>
        <div class="desc">问题，当数据过多时，渲染出现卡顿。因为 dom 数量过大。实现方案将树形数据和 dom 扁平化虚拟长列表控制 dom 渲染数量1.扁平化扁平化tree的DOM结构图-1由上图可以看出经过扁平化处理后的父子节点dom是同级的，接下来我们来实现将tree数据扁平化处理。</div>
        <div class="action">
          <span><i class="iconfont icon-eye1"></i>2000</span>
          <span><i class="iconfont icon-dianzan_active"></i>500</span>
          <span><i class="iconfont icon-pinglun1"></i>20</span>
        </div>
      </div>
    </div>
    <div class="article-item card">
      <div class="article-img">
        <img src="" alt="">
      </div>
      <div class="article-info">
        <div class="title">收到回复艰苦大师</div>
        <div class="time"><i class="iconfont icon-rili"></i> 2021.03.26</div>
        <div class="desc">问题，当数据过多时，渲染出现卡顿。因为 dom 数量过大。实现方案将树形数据和 dom 扁平化虚拟长列表控制 dom 渲染数量1.扁平化扁平化tree的DOM结构图-1由上图可以看出经过扁平化处理后的父子节点dom是同级的，接下来我们来实现将tree数据扁平化处理。</div>
        <div class="action">
          <span><i class="iconfont icon-eye1"></i>2000</span>
          <span><i class="iconfont icon-dianzan_active"></i>500</span>
          <span><i class="iconfont icon-pinglun1"></i>20</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  props: {
    
  },
  components: {
  },
  setup () {
    return {}
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
      img{
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


</style>