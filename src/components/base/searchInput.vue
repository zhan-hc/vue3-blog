<template>
<div class="search-wrap">
  <i class="iconfont icon-chakan"></i>
  <input type="text">
</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  props: {
    
  },
  components: {
  },
  setup () {
    return {}
  }
})
</script>

<style scoped lang='scss'>
.search-wrap{
  display: inline-block;
  background-color: #fff;
  border: 1px solid#E8E8E8;
  height: 30px;
  border-radius: 4px;
  line-height: 30px;
  padding: 0 10px;
  margin-right: 20px;
  &:focus-within{
    border-color:#196a73;
    cursor: auto;
  }
  .iconfont{
    margin-right: 5px;
    cursor: pointer;
  }
  input{
    width: 160px;
    border: none;
    &:focus{
      outline: none;
    }
    &:focus-visible {
      outline-offset: 0px;
    }
  }
}

@media screen and (max-width: 960px) {
  .search-wrap{
    border: none;
    background-color: transparent;
    margin-right: 0;
    input{
      display: none;
    }
  }
}
</style>