<template>
  <div class="blog-wrap">
    <h1>新增博客</h1>
    <el-form
      ref="blogForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="博客标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="博客标签" prop="tag">
        <el-checkbox-group v-model="ruleForm.tag">
          <el-checkbox label="Javascript" name="tag"></el-checkbox>
          <el-checkbox label="CSS" name="tag"></el-checkbox>
          <el-checkbox label="HTML" name="tag"></el-checkbox>
          <el-checkbox label="VUE" name="tag"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="博客描述" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="博客内容" prop="content">
        <v-md-editor v-model="ruleForm.content" height="400px"></v-md-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >新增</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { defineComponent, ref, reactive, toRefs } from 'vue'
  export default defineComponent({
    name: '',
    props: {},
    components: {},
    setup() {
      const blogForm = ref(null)
      const state = reactive({
        ruleForm: {
          title: '',
          tag: [],
          desc: '',
          content: '',
        },
        rules: {
          title: [
            {
              required: true,
              message: '请输入博客标题',
              trigger: 'blur',
            },
          ],
          content: [
            {
              required: true,
              message: '请输入博客内容',
              trigger: 'blur',
            },
          ],
        },
      })
      const submitForm = () => {
        console.log(blogForm, blogForm.value)
        blogForm.value.validate((valid) => {
          if (valid) {
            console.log(state.ruleForm)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
      const resetForm = () => {
        blogForm.value.resetFields()
      }
      return {
        ...toRefs(state),
        blogForm,
        submitForm,
        resetForm,
      }
    },
  })
</script>

<style scoped lang="scss">
  .blog-wrap {
    margin: 40px;
  }
</style>
