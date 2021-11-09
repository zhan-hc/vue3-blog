<template>
  <div class="author-wrap card">
    <div class="avatar-img">
      <img v-show="ruleForm.avatar" :src="ruleForm.avatar" alt="">
      <img v-show="!ruleForm.avatar" src="@/assets/images/bg.gif" alt="">
    </div>
    <el-upload
      class="upload-demo"
      :action="`${url}/blog/upload/images`"
      :headers="headers"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      accept=".jpg,.jpeg,.gif,.png"
    >
    <el-button style="margin-bottom:20px">更换头像</el-button>
    </el-upload>
    <el-form
      ref="userForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="昵称" prop="blogName">
        <el-input v-model="ruleForm.blogName"></el-input>
      </el-form-item>
      <el-form-item label="个性签名" prop="motto">
        <el-input v-model="ruleForm.motto" type="textarea" rows="2"></el-input>
      </el-form-item>
      <el-form-item label="GitHub" prop="github">
        <el-input v-model="ruleForm.github"><template #prepend>Http://</template></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="saveUserInfo" >保存设置</el-button>
  </div>
</template>

<script>
import { defineComponent, toRefs, ref, reactive, getCurrentInstance, onMounted, computed } from 'vue'
import {getUserInfo, updateUserInfo} from '@/api/user'
  import {ElMessage} from 'element-plus'
export default defineComponent({
  name: 'manageMain',
  setup () {
    const userForm = ref(null)
    const {proxy} = getCurrentInstance()
    const state = reactive({
      ruleForm: {
        avatar: '',
        blogName: '',
        motto: '',
        github: ''
      },
      rules: {
        blogName: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur',
          },
        ],
      },
      headers: {
          'Authorization': `${sessionStorage.getItem('token')}`
        }
    })
    const id = computed(() => {return sessionStorage.getItem('userId')})
    onMounted(() => {
        getUser()
      })

    const getUser = () => {
      getUserInfo({id:id.value}).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data[0]
          Object.keys(data).forEach(item => {
            data[item] && (state.ruleForm[item] = data[item])
          })
        }
      })
    }

    // 保存用户数据
    const saveUserInfo = () => {
      userForm.value.validate((valid) => {
          if (valid) {
            updateUserInfo({...state.ruleForm,id:id.value,check: 1 }).then(res => {
              if (res.data.code === 200) {
                ElMessage({
                  message: res.data.msg,
                  type: 'success',
                })
                getUser()
              }
            })
          }
        })
    }

    // 上传成功回调
      const uploadSuccess = (response, file, fileList) => {
        const {filename} = response.data
        state.ruleForm.avatar = `${proxy.url}/images/${filename}`
        console.log(state.fileList,'state.fileList')
      }
    // 上传失败回调
    const uploadError = (error, file, fileList) => {
      console.log(error)
    }
    
    return {
      id,
      userForm,
      ...toRefs(state),
      uploadSuccess,
      uploadError,
      getUser,
      saveUserInfo
    }
  }
})
</script>
<style scoped lang='scss'>
.author-wrap{
  // display: inline-block;
  float: right;
  padding: 20px;
  text-align: center;
  .avatar-img{
    height: 110px;
    margin-bottom: 20px;
    img{
      width: 110px;
      height: 110px;
      border-radius: 50%;
    }
  }
  .name{
    font-size: 26px;
    font-weight: bold;
    letter-spacing: 4px;
    margin-bottom: 20px;
  }
  .motto{
    margin-bottom: 20px;
  }
  .blog-data{
    display: flex;
    margin-bottom: 20px;
    .data-item{
      flex: 1;
      text-align: center;
      .item-title{
        margin-bottom: 10px;
      }
      .item-count{
        font-size: 20px;
      }
    }
  }
  .github-btn{
    height: 33px;
    line-height: 33px;
    background-color: #196a73;
    text-align: center;
    color: #fff;
    i{
      margin-right: 10px;
    }
  }
    /deep/ .el-form-item__label {
    width: 80px !important;
  }
}
</style>