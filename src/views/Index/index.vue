<template>
  <div>
    <nav-header />
    <index-content />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
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
    return {}
  }
})
</script>

<style scoped lang='scss'>

</style>