<template>
  <div class="content-wrap">
    <div class="content-left">
      <article-item />
    </div>
    <div class="content-right">
      <author-card />
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, reactive} from 'vue'
import articleItem from './articleItem.vue'
import authorCard from './authorCard.vue'
export default defineComponent({
  name: '',
  props: {
    
  },
  components: {
    articleItem,
    authorCard
  },
  setup () {
    return {}
  }
})
</script>

<style scoped lang='scss'>
.content-wrap{
  width: 1200px;
  margin: 40px auto;
  display: flex;
  .content-left{
    width: 900px;
    margin-right: 40px;
  }
  .content-right{
  }
}

</style>