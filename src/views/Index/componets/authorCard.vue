<template>
  <div class="author-wrap">
    <div class="avatar-img">
      <img src="@/assets/images/bg.gif" alt="">
    </div>
    <div class="name">笨鸟</div>
    <div class="motto">让自己的内心藏着一条巨龙,既是一种苦刑,也是一种乐趣</div>
    <div class="blog-data">
      <div class="data-item">
        <div class="item-title">Articles</div>
        <div class="item-count">24</div>
      </div>
      <div class="data-item">
        <div class="item-title">Tags</div>
        <div class="item-count">24</div>
      </div>
      <div class="data-item">
        <div class="item-title">Categories</div>
        <div class="item-count">24</div>
      </div>
    </div>
    <div class="github-btn">
      <i class="iconfont icon-huaban88"></i>
      <span>Follow Me</span>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, reactive} from 'vue'
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
.author-wrap{
  display: inline-block;
  width: 277px;
  height: 346px;
  padding: 20px;
  border-radius: 12px 8px 8px 12px;
  box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
  text-align: center;
  .avatar-img{
    height: 110px;
    margin-bottom: 20px;
    img{
      width: 110px;
      height: 110px;
      border-radius: 50%;
    }
  }
  .name{
    font-size: 26px;
    font-weight: bold;
    letter-spacing: 4px;
    margin-bottom: 20px;
  }
  .motto{
    margin-bottom: 20px;
  }
  .blog-data{
    display: flex;
    margin-bottom: 20px;
    .data-item{
      flex: 1;
      text-align: center;
      .item-title{
        margin-bottom: 10px;
      }
      .item-count{
        font-size: 20px;
      }
    }
  }
  .github-btn{
    height: 33px;
    line-height: 33px;
    background-color: #196a73;
    text-align: center;
    color: #fff;
    i{
      margin-right: 10px;
    }
  }
}
</style>