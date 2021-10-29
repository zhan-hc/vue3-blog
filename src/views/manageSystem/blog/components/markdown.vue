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
      <el-form-item label="封面图" prop="pageImage">
        <el-upload
          class="upload-demo"
          action="http://192.168.1.102:3000/blog/upload/images"
          :headers="headers"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :file-list="fileList"
          accept=".jpg,.jpeg,.gif,.png"
          list-type="picture"
        >
          <el-button size="small" type="primary">上传图片</el-button>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="博客标签" prop="tagId">
        <el-select v-model="ruleForm.tagId" multiple placeholder="文章标签">
          <el-option v-for="item in tagList" :key="item.id"  :label="item.tagName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="博客描述" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="博客内容" prop="content">
        <v-md-editor v-model="ruleForm.content" height="400px"></v-md-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >{{status ? '更改': '新增'}}</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
  import {useRouter, useRoute} from 'vue-router'
  import {getTagList} from '@/api/tag'
  import {addBlogArticle, getArticleList, updateBlogArticle} from '@/api/article'
  import {ElMessage} from 'element-plus'
  export default defineComponent({
    name: 'markdown',
    props: {},
    components: {},
    setup() {
      const blogForm = ref(null)
      const router = useRouter()
      const route = useRoute()
      const state = reactive({
        ruleForm: {
          title: '',
          tagId: [],
          desc: '',
          content: '',
          pageImage: ''
        },
        id: '',
        status: 0, // 0add|1edit
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
        tagList: [],
        fileList: [],
        headers: {
          'Authorization': `${sessionStorage.getItem('token')}`
        }
      })
      onMounted(() => {
        getBlogTagList()
        if (route.query.id) {
          state.status = 1
          state.id = route.query.id
          getBlogArticleList(route.query.id)
        }
      })
      const submitForm = () => {
        blogForm.value.validate((valid) => {
          if (valid) {
            state.status ?
            updateBlogArticle({...state.ruleForm,id:state.id}).then(res => {redirectPage(res)}) :
            addBlogArticle(state.ruleForm).then(res => {redirectPage(res)})
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }

      const redirectPage = (res) => {
        if (res.data.code === 200) {
          blogForm.value.resetFields()
          ElMessage({
          message: res.data.msg,
          type: 'success',
        })
          router.replace({name:'blogArticle'})
        }
      }

      const resetForm = () => {
        blogForm.value.resetFields()
      }
      // 获取标签列表
      const getBlogTagList = () => {
        getTagList({status: 1}).then(res => {
          if (res.data.code === 200) {
            const data = res.data.data
            state.tagList = data.rows
          }
        })
      }
      // 上传成功回调
      const uploadSuccess = (response, file, fileList) => {
        const {filename} = response.data
        state.fileList = [
          {
            name: filename,
            url: `http://192.168.1.102:3000/images/${filename}`
          }
        ]
        state.ruleForm.pageImage = filename
        console.log(state.fileList,'state.fileList')
      }
      // 上传失败回调
      const uploadError = (error, file, fileList) => {
        console.log(error)
      }
      // 获取文章列表
      const getBlogArticleList = (id) => {
        getArticleList({id:id}).then(res => {
          if (res.data.code === 200) {
            const {rows} = res.data.data
            console.log(rows, 'aaaaa',rows[0].tag_id)
            state.ruleForm = {
              title: rows[0].title,
              tagId: rows[0].tag_id ? rows[0].tag_id.split(',') : [],
              desc: rows[0].desc,
              content: rows[0].content,
              pageImage: rows[0].pageImage
            }
            rows[0].pageImage && (
              state.fileList = [
                {
                  name: rows[0].pageImage,
                  url: `http://192.168.1.102:3000/images/${rows[0].pageImage}`
                }
              ]
            )
            console.log(state.ruleForm,'state.ruleForm')
            // state.articleList = data.rows
            // state.total = data.count
          }
        })
      }
      return {
        ...toRefs(state),
        blogForm,
        submitForm,
        resetForm,
        getBlogTagList,
        uploadSuccess,
        uploadError,
        redirectPage,
        getBlogArticleList
      }
    },
  })
</script>

<style scoped lang="scss">
  .blog-wrap {
    margin: 40px;
  }
</style>
