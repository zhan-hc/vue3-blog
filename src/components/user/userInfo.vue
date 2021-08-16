<template>
  <div class="info-wrap">
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
    </div>
    <div
      v-for="(item, i) in navList"
      :key="i"
      class="nav-item"
      :class="{'active': i === activeIndex}"
    >
      <i class="iconfont" :class="item.icon" />
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, inject } from 'vue'
import { navList } from '@/assets/ts/common'
export default defineComponent({
  name: '',
  props: {
  },
  components: {
  },
  setup () {
    const activeIndex = inject("activeIndex")
    return {
      navList,
      activeIndex
    }
  }
})
</script>

<style scoped lang='scss'>
.info-wrap{
  // text-align: center;
  .avatar-img{
    height: 90px;
    margin-bottom: 20px;
    text-align: center;
    img{
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
  }
  .name{
    font-size: 26px;
    font-weight: bold;
    letter-spacing: 4px;
    margin-bottom: 20px;
    text-align: center;
  }
  .motto{
    margin-bottom: 20px;
  }
  .blog-data{
    display: flex;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    .data-item{
      flex: 1;
      text-align: center;
      &:first-of-type{
        border-right: 1px solid #ccc;
      }
      .item-title{
        margin-bottom: 10px;
      }
      .item-count{
        font-size: 20px;
      }
    }
  }
  .nav-item{
    margin-bottom: 10px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    letter-spacing: 2px;
    .iconfont{
      margin-right: 10px;
    }
    &.active {
      color: #196a73;
    }
  }
}
</style>