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
  name: '',
  props: {
    
  },
  components: {
    navHeader,
    indexContent
  },
  setup () {
    const activeIndex = ref(0)
    provide('activeIndex', activeIndex)
    return {}
  }
})
</script>

<style scoped lang='scss'>
.index-wrap{
  overflow: auto;
}
</style>