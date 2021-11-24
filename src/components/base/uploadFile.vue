<template>
<div class="wrap">
  <input type="file" ref="uploadInput"  @change="tirggerFile"/>
  <el-button @click="pauseUpload">暂停</el-button>
  <el-button @click="verifyUpload(file,fileHash,chunkName,chunkLen)">续传</el-button>
  <h1 v-show="totalPercent">总进度：{{cacheTotal > totalPercent ? cacheTotal : totalPercent}}%<el-progress :percentage="totalPercent" /></h1>
  <!-- <p v-for="(chunkFile,i) in chunkList" :key="i">
    {{chunkFile.chunkName}}----{{chunkFile.percent}}%
    <el-progress
    color="#e6a23c"
    :percentage="chunkFile.percent" />
  </p> -->
</div>
  
</template>

<script>
import SparkMD5 from "spark-md5"
import {computed, defineComponent, reactive, toRefs} from 'vue'
import {uploadFile, mergeFile, verifyFile} from '@/api/common'
import {ElMessage} from 'element-plus'
import axios from 'axios'

const CancelToken = axios.CancelToken;
let source = CancelToken.source();
export default defineComponent({
  name: '',
  props: {
    
  },
  components: {
    
  },
  setup () {
    const state =reactive({
      chunkList: [],
      fileHash: '',
      chunkLen: 0,
      chunkName: '',
      file: null,
      cacheTotal: 0
    })
    const totalPercent = computed(() => {
      if (state.chunkList.length === 0) return 0
      let percent = state.chunkList.map(({size,percent}) => size * percent)
        .reduce((prev, curr) => prev + curr)
      return parseInt((percent/state.file.size))
      // return parseInt(state.chunkList.map(item=>100/state.chunkList.length*(item.percent/100))
      //   .reduce(function(prev, curr, idx, arr){
      //     return prev + curr
      //   })
      // )
    })
    const tirggerFile = (event) => {
      state.file = event.target.files[0]
      console.log(state.file,'state.file')
      md5(state.file,(hash => {
        state.fileHash = hash
        verifyUpload(state.file,hash)
      }))
      console.log(state.hash,'hash')
      // createChunk(event.target.files[0])
    }
    const createChunk = async (file,chunkUpload,size=5*1024*1024) => {
      let chunkList = []
      let cur = 0
      while(cur < file.size) {
        chunkList.push({file:file.slice(cur,cur+size)})
        cur += size
      }
      console.log(chunkList)
      if (!chunkUpload.length) {
        state.chunkLen = chunkList.length
        state.chunkList = fillParams(file,chunkList)
      }
      chunkReq(state.file,chunkUpload)
    }

    const chunkReq = async (file, chunkUpload) => {
      let chunkList = []
      let chunkArr = chunkUpload.length > 0 ? state.chunkList.filter(item => !chunkUpload.includes(item.index)) : state.chunkList
      console.log(chunkArr,chunkArr.length,'0-------------------------')
      chunkList = chunkArr.map((item,index) => {
        const formData = new FormData()
        formData.append("file", item.file)
        formData.append("fileName",  item.fileName)
        formData.append("chunkName",  item.chunkName)
        return {
          formData,
          index: chunkUpload.length > 0 ? item.index : index
        }
      }).map(({formData,index}) => {
        return uploadFile(formData,(e) => {
          state.chunkList[index].percent =  parseInt(String((e.loaded / e.total) * 100))
        },source.token)
      })
      await Promise.all(chunkList).then(res => {
        const uploadFailed = res.some(item => !item)
        !uploadFailed && mergeFile({chunkName: state.chunkList[0].fileName,fileName: file.name, chunkLen: state.chunkList.length}).then(res1 => {
          if (res1.data.code === 200) {
            ElMessage({
                message: res1.data.msg,
                type: 'success',
              })
          }
        })
      })
    }
    const fillParams = (files,chunkList) => {
      // 截取文件名
      const suffixEq = files.name.lastIndexOf('.')
      const fileName = files.name.slice(0,suffixEq)
      const now = Date.now()
      state.chunkName = fileName + now
      let chunkFile = chunkList.map(({ file }, index) => ({
        file,
        size: file.size,
        percent: 0,
        chunkName: `${fileName}-${index}`,
        fileName: state.chunkName,
        index
     }))
     return chunkFile
    }
    const md5 = (file, cb, chunkSize = 5*1024*1024) => {
      var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,                           // Read in chunks of 2MB
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer(),
        fileReader = new FileReader()

      fileReader.onload = async function (e) {
          spark.append(e.target.result)                   // Append array buffer
          currentChunk++

          if (currentChunk < chunks) {
              loadNext()
          } else {
              const fileHash = spark.end()
              cb(fileHash)
          }
      }

      fileReader.onerror = function () {
          console.warn('oops, something went wrong.')
      }

      function loadNext() {
          var start = currentChunk * chunkSize,
              end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
      }

      loadNext()
    }
    const verifyUpload =async (file,fileHash,chunkName=0,chunkLen=0) => {
      const res = await verifyFile({key: fileHash,chunkName,chunkLen})
          if (res.data.code === 200) {
            const data = res.data.data
            if (data.shouldUpload) {
              createChunk(file,data.uploadChunk)
            } else {
              ElMessage({
                message: res.data.msg,
                type: 'success',
              })
            }
            
          }
    }
    const pauseUpload = () => {
      source.cancel("中断上传!");
      source = CancelToken.source(); // 重置source，确保能续传
      state.cacheTotal = totalPercent
    }
    return {
      ...toRefs(state),
      totalPercent,
      tirggerFile,
      pauseUpload,
      verifyUpload
    }
  }
})
</script>

<style scoped lang='scss'>
.wrap{
  padding: 10px;
}
input{
  display: block;
  margin: 10px;
}
</style>