<template>
  <div>
    <nav-header />
  </div>
</template>

<script lang='ts'>
import {defineComponent, reactive} from 'vue'
import navHeader from './componets/navHeader.vue'
export default defineComponent({
  name: '',
  props: {
    
  },
  components: {
    navHeader
  },
  setup () {
    return {}
  }
})
</script>

<style scoped lang='scss'>

</style>