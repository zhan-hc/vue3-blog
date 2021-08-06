<template>
  <header class="navbar">
    <div class="navbar-left">
      <img src="@/assets/images/logo.png" alt="">
      <span>笨鸟博客</span>
    </div>
    <nav class="nav-wrap">
      <div class="nav-item"><i class="iconfont icon-xuanzhongshangcheng-copy"></i> 主页</div>
      <div class="nav-item"><i class="iconfont icon-tag1"></i> 标签</div>
      <div class="nav-item"><i class="iconfont icon-tuku"></i> 图库</div>
    </nav>
  </header>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'

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
.navbar{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  line-height: 40px;
  padding: 10px 20px;
  box-shadow: 0 3px 5px #ccc;
  &-left{
    display: inline-block;
    max-width: 1000px;
    font-weight: bold;
    img{
      vertical-align: top;
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    span{
      font-size: 18px;
      letter-spacing: 1px;
    }
  }
  .nav-wrap{
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 10px;
    .nav-item {
      display: inline-block;
      margin-right: 15px;
      font-size: 16px;
    }
  }
}
</style>