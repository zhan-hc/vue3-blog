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
        <div class="nav-menu">
          <i class="iconfont icon-detail2" @click="show"></i>
        </div>
      </nav>
    </div>
    <iframe class="navbar-main" frameborder="0" scrolling="no" src="sawtooth/sawtooth.html" height="650px"></iframe>
  </header>
  <drop-left :visibleShow="visibleShow">
    <template #content>
      <user-info />
    </template>
  </drop-left>
</template>

<script lang='ts'>
import {defineComponent, ref, provide} from 'vue'
import { navList } from '@/assets/ts/common'
import headerInput from '@/components/base/searchInput.vue'
import dropLeft from '@/components/base/dropLeft.vue'
import userInfo from '@/components/user/userInfo.vue'
export default defineComponent({
  name: '',
  props: {
    
  },
  components: {
    headerInput,
    dropLeft,
    userInfo
  },
  setup () {
    const searchVal = ref('')
    const visibleShow = ref(false)
    provide('visibleShow', visibleShow)
    const show = () => {
      visibleShow.value = true
    }
    return {
      show,
      navList,
      searchVal,
      visibleShow
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
    z-index: 5;
    // @include backgroundColor;
    background-color: rgba(255,255,255,0.5);
    .navbar-left{
      display: inline-block;
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
      .nav-menu{
        display: none;
        cursor: pointer;
      }
    }
    .el-input {
      width: 150px;
    }
    @media screen and (max-width: 750px) {
      .nav-wrap{
        .nav-item {
          display: none;
        }
        .nav-menu{
          display: inline-block;
        }
      }
    }
  }
  &-main{
    width: 100%;
    min-width: 1200px;
  }
  @media screen and (max-width: 750px) {
    .navbar-header{
      .nav-wrap{
        .nav-item {
          display: none;
        }
        .nav-menu{
          display: inline-block;
        }
      }
    }
    .navbar-main{
      height: 400px;
      min-width: 300px;
    }
  }
}
</style>