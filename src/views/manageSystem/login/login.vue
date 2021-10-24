<template>
  <div class='login-wrap'>
    <el-form ref='ruleForm' label-position='right' label-width='80px' :model='form' :rules='rules'>
      <el-form-item prop='username'>
          <el-input v-model='form.username' placeholder='请输入用户名' prefix-icon='el-icon-user' />
      </el-form-item>
      <el-form-item prop='password'>
          <el-input v-model='form.password' placeholder='请输入密码' prefix-icon='el-icon-lock' show-password />
      </el-form-item>
      <el-form-item>
          <el-button type='primary' @click='submitForm'>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, toRefs} from 'vue'
import {login} from '@/api/login'
export default defineComponent({
  name: 'login',
  setup () {
    const ruleForm = ref(null)
    const state = reactive({
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          }
        ],
      }
    })
    const submitForm = () => {
        ruleForm.value.validate((valid) => {
          if (valid) {
            console.log(state.ruleForm)
            const params = {
              username: state.form.username,
              password: state.form.password
            }
            login(params).then(res => {
              if (res.data.code === 200) {
                console.log(res.data.data)
                const {data} = res.data.data
                localStorage.setItem('token',data)
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
      return {
        ruleForm,
        submitForm,
        ...toRefs(state)
      }
  }
})
</script>

<style scoped lang='scss'>
  .login-wrap{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 500px;
    height: 300px;
    padding: 30px;
    box-sizing: border-box;
    border: 3px solid #ccc;
    border-radius: 6px;
    /deep/.el-form-item__content{
      margin-left: 0 !important;
    }
  }
</style>