<template>
  <div class="index-wrap">
    <nav-header />
    <index-content />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, provide } from 'vue'
import navHeader from './componets/navHeader.vue'
import indexContent from './componets/indexContent.vue'
export default defineComponent({
  name: 'blogIndex',
  props: {
    
  },
  components: {
    navHeader,
    indexContent
  },
  setup () {
    const activeIndex = ref(0)
    const hasIndex = ref(1) //是否是首页
    provide('activeIndex', activeIndex)
    provide('hasIndex', hasIndex)
    return {

    }
  }
})
</script>

<style scoped lang='scss'>
.index-wrap{
  overflow: auto;
}
</style>