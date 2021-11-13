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
          <el-button type='primary' @click='handleSubmit'>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs, Ref} from 'vue'
import {useRouter} from 'vue-router'
import {login} from '@/api/login'
import validateFun from '@/use/validate'
export default defineComponent({
  name: 'login',
  setup () {
    const {submitForm} = validateFun()
    const ruleForm: Ref<HTMLElement | null> = ref(null)
    const router = useRouter()
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
    const handleSubmit = () => {
      submitForm(ruleForm,() => login(state.form), (data:any) => {
        sessionStorage.setItem('token',data.token)
        sessionStorage.setItem('userId', data.userId)
        sessionStorage.setItem('userName', state.form.username)
        router.push('/manage')
      })
    }
      return {
        ruleForm,
        handleSubmit,
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