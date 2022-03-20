<template>
  <el-upload
    class="upload-demo"
    :action="`${url}/blog/upload/images`"
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
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'

  export default defineComponent({
    name: '',
    props: {
      fileList: {
        type: Array,
        default: () => [],
      },
    },
    setup(props, context) {
      const state = {
        headers: {
          Authorization: `${sessionStorage.getItem('token')}`,
        },
      }

      const uploadSuccess = (response: any) => {
        const { filename } = response.data
        context.emit('uploadSuccess', filename)
      }
      // 上传失败回调
      const uploadError = (error: any) => {
        context.emit('uploadError', error)
      }
      console.log(props.fileList, 'fileListfileList')
      return {
        ...toRefs(state),
        uploadSuccess,
        uploadError,
      }
    },
  })
</script>

<style scoped lang="scss"></style>
