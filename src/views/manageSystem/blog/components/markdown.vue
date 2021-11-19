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
        <uploadImage @uploadSuccess="uploadSuccess" @uploadError="uploadError"/>
      </el-form-item>
      <el-form-item label="博客分类" prop="categoryId">
        <el-select v-model="ruleForm.categoryId" placeholder="文章分类">
          <el-option v-for="item in categoryList" :key="item.id"  :label="item.categoryName" :value="item.id"></el-option>
        </el-select>
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
        <el-button type="primary" @click="handleSubmit('ruleForm')"
          >{{status ? '更改': '新增'}}</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { defineComponent, ref, reactive, toRefs, onMounted, getCurrentInstance } from 'vue'
  import {useRouter, useRoute} from 'vue-router'
  import validateFun from '@/use/validate'
  import categoryFun from '@/use/blogCategory'
  import tagFun from '@/use/blogTag'
  import uploadImage from '@/components/base/uploadImage.vue'
  import {addBlogArticle, getArticleList, updateBlogArticle} from '@/api/article'
  import {ElMessage} from 'element-plus'
  export default defineComponent({
    name: 'markdown',
    props: {},
    components: {
      uploadImage
    },
    setup() {
      const blogForm = ref(null)
      const router = useRouter()
      const route = useRoute()
      const {proxy} = getCurrentInstance()
      const {submitForm} = validateFun()
      const {tagData,getCategoryListFun} = categoryFun()
      const {categoryData,getTagListFun} = tagFun()
      console.log(tagData,categoryData,'按揭购房扣税的')
      // const {onlineFun,getListFun,defaultData, deleteFun, handleCurrentChange} = apiFun(0)
      const state = reactive({
        ruleForm: {
          title: '',
          tagId: [],
          categoryId:[],
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
        fileList: [],
        headers: {
          'Authorization': `${sessionStorage.getItem('token')}`
        }
      })
      onMounted(() => {
        getCategoryListFun()
        getTagListFun()
        if (route.query.id) {
          state.status = 1
          state.id = route.query.id
          getBlogArticleList(route.query.id)
        }
        console.log(tagData,categoryData,'dfsdf')
      })
      const handleSubmit = () => {
        submitForm(blogForm,
          () => state.status ? updateBlogArticle({...state.ruleForm,id:state.id}) : addBlogArticle(state.ruleForm),
          res => {
            blogForm.value.resetFields()
            ElMessage({
              message: res.msg,
              type: 'success',
            })
            router.replace({name:'blogArticle'})
          }
        )
      }

      const resetForm = () => {
        blogForm.value.resetFields()
      }
      // 上传成功回调
      const uploadSuccess = (filename) => {
        state.fileList = [
          {
            name: filename,
            url: `${proxy.url}/images/${filename}`
          }
        ]
        state.ruleForm.pageImage = filename
      }
      // 上传失败回调
      const uploadError = (error) => {
        console.log(error)
      }
      // 获取文章列表
      const getBlogArticleList = (id) => {
        getArticleList({id:id}).then(res => {
          if (res.data.code === 200) {
            const {rows} = res.data.data
            state.ruleForm = {
              title: rows[0].title,
              tagId: rows[0].tagId ? rows[0].tagId.split(',').map(item=>Number(item)) : [],
              categoryId: rows[0].categoryId || [],
              desc: rows[0].desc,
              content: rows[0].content,
              pageImage: rows[0].pageImage
            }
            rows[0].pageImage && (
              state.fileList = [
                {
                  name: rows[0].pageImage,
                  url: `${proxy.url}/images/${rows[0].pageImage}`
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
        ...toRefs(tagData),
        ...toRefs(categoryData),
        blogForm,
        handleSubmit,
        resetForm,
        uploadSuccess,
        uploadError,
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
