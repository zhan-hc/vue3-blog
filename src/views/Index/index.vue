<template>
  <div>
    <nav-header />
    <article-item />
  </div>
</template>

<script lang='ts'>
import {defineComponent, reactive} from 'vue'
import navHeader from './componets/navHeader.vue'
import articleItem from './componets/content.vue'
export default defineComponent({
  name: '',
  props: {
    
  },
  components: {
    navHeader,
    articleItem
  },
  setup () {
    return {}
  }
})
</script>

<style scoped lang='scss'>

</style>