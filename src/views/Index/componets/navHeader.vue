<template>
  <header class="navbar">
    <div class="navbar-header">
      <div class="navbar-left">
        <img src="@/assets/images/logo.png" alt="">
        <span>笨鸟博客</span>
      </div>
      <nav class="nav-wrap">
        <header-input />
        <div
          v-for="(item, i) in navList"
          :key="i"
          class="nav-item"
        >
          <i class="iconfont" :class="item.icon" />
          <span>{{item.name}}</span>
        </div>
      </nav>
    </div>
    <iframe frameborder="0" scrolling="no" src="sawtooth/sawtooth.html" width="100%" height="650px"></iframe>
  </header>
</template>

<script lang='ts'>
import {defineComponent, ref} from 'vue'
import { navList } from '../../../assets/ts/common'
import headerInput from '@/components/base/searchInput.vue'
export default defineComponent({
  name: '',
  props: {
    
  },
  components: {
    headerInput
  },
  setup () {
    const searchVal = ref('')
    return {
      navList,
      searchVal
    }
  }
})
</script>

<style scoped lang='scss'>
@import '@/assets/scss/mixins/mixins.scss';
.navbar{
  &-header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
    padding: 10px 20px;
    // @include backgroundColor;
    background-color: rgba(255,255,255,0.5);
    .navbar-left{
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
        .iconfont{
          margin-right: 3px;
        }
      }
    }
    .el-input {
      width: 150px;
    }
  }
}
</style>