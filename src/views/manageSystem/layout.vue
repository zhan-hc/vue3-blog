<template>
  <div>布局管理</div>
</template>

<script>
  import { toRefs, reactive } from 'vue'
  export default {
    name: '',
    components: {},
    setup(props, context) {
      const state = reactive({
        count: 0,
      })
      return {
        ...toRefs(state),
      }
    },
  }
</script>

<style scoped lang="scss"></style>
