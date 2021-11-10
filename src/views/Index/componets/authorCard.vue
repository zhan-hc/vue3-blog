<template>
  <div class="author-wrap card">
    <div class="avatar-img">
      <img :src="userInfo.avatar || '@/assets/images/bg.gif'" alt="">
    </div>
    <div class="name">{{userInfo.blogName}}</div>
    <div class="motto">{{userInfo.motto}}</div>
    <div class="blog-data">
      <div class="data-item">
        <div class="item-title">Articles</div>
        <div class="item-count">{{artLen}}</div>
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
      <a :href="userInfo.github">Follow Me</a>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, computed, toRefs } from 'vue'
import {getUserInfo} from '@/api/user'
export default defineComponent({
  name: 'authorCard',
  props: {
    artLen: {
      type: Number,
      default: () => 0
    }
  },
  components: {
  },
  setup () {
    const state = reactive({
      userInfo: {}
    })
    const id = computed(() => {return localStorage.getItem('userId')})
    onMounted (() => {
      getUser()
    })
    const getUser = () => {
      getUserInfo({id:id.value}).then(res => {
        if (res.data.code === 200) {
          state.userInfo = res.data.data[0]
        }
      })
    }
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang='scss'>
.author-wrap{
  display: inline-block;
  width: 277px;
  // height: 346px;
  padding: 20px;
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
    a{
      color: #fff;
      text-decoration:none;
    }
  }
}
</style>