<template>
  <el-container>
    <el-header style="display: flex;">
      <p>博客管理系统</p>
      <span>zhan-hc</span>
      <el-dropdown>
        <i class="el-icon-setting"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template #title><i class="el-icon-tickets"></i>博客</template>
            <router-link index="1" to="/manageIndex/blog">
              <el-menu-item index="1">博客管理</el-menu-item>
            </router-link>
            <!-- <el-menu-item index="1">博客管理</el-menu-item> -->
            <el-menu-item-group>
              <template #title>分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-3">
              <template #title>选项3</template>
              <el-menu-item index="1-3-1">选项3-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template #title><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template #title>分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template #title>选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: '',
    props: {},
    components: {},
  })
</script>

<style scoped lang="scss">
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    display: flex;
    align-items: center;
    p {
      flex: 1;
      font-weight: bold;
      font-size: 20px;
      letter-spacing: 1px;
    }
    span {
      margin-right: 20px;
    }
    .el-icon-setting {
      font-size: 18px;
    }
  }
  .el-aside {
    color: #333;
    height: 100%;
  }
</style>
