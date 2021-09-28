<template>
  <div>
    <v-md-editor v-model="text" height="400px"></v-md-editor>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: '',
  props: {
  },
  components: {
  },
  setup () {
    const mdValue = ref('')
    return {
      mdValue
    }
  }
})
</script>

<style scoped lang='scss'>
  
</style>