<template>
  <transition name="wrap">
    <div class="drop-wrap" v-show="visibleShow" @click.self="visibleShow = false">
      <transition  name="left">
        <div class="drop-content" v-show="visibleShow">
          <slot name="content" />
        </div>
        </transition>
    </div>
  </transition>
    <!-- <div class="drop-wrap" v-show="visibleShow" @click.self="visibleShow = false">
      <transition  name="left">
      <div class="drop-content" v-show="visibleShow">
        <slot name="content" />
      </div>
      </transition>
    </div> -->
</template>

<script lang='ts'>
import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'dropLeft',
  props: {
    // visibleShow: {
    //   type: Boolean,
    //   default: () => false
    // }
  },
  components: {
  },
  setup () {
    const visibleShow = inject("visibleShow")
    return {
      visibleShow
    }
  }
})
</script>

<style scoped lang='scss'>
.drop-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.65);
  z-index: 9;
  .drop-content{
    background-color: #fff;
    width: 250px;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
}
.left-enter-from,
.left-leave-to {
  transform: translate3d(-100%, 0, 0);
}
.left-leave-from,
.left-enter-to {
  transform: translate3d(0, 0, 0);
}
.left-enter-active,
.left-leave-active {
  transition: all 0.2s;
}
.wrap-leave-active{
  transition: all 0.1s;
}
</style>