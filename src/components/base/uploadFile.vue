<template>
  <input type="file" ref="uploadInput"  @change="tirggerFile($event)"/>
  <h1 v-show="totalPercent">总进度：{{totalPercent}}%<el-progress :percentage="totalPercent" /></h1>
  <p v-for="(chunkFile,i) in chunkList" :key="i">
    {{chunkFile.chunkName}}----{{chunkFile.percent}}%
    <el-progress
    color="#e6a23c"
    :percentage="chunkFile.percent" />
  </p>
</template>

<script>
import SparkMD5 from "spark-md5"
import {computed, defineComponent, reactive, toRefs} from 'vue'
import {uploadFile, mergeFile, verifyFile} from '@/api/common'
  import {ElMessage} from 'element-plus'
export default defineComponent({
  name: '',
  props: {
    
  },
  components: {
    
  },
  setup () {
    const state =reactive({
      chunkList: [],
      hash: ''
    })
    const totalPercent = computed(() => {
      if (state.chunkList.length === 0) return 0
      return parseInt(state.chunkList.map(item=>100/state.chunkList.length*(item.percent/100))
        .reduce(function(prev, curr, idx, arr){
          return prev + curr
        })
      )
    })
    const tirggerFile = (event) => {
      console.log(event.target.files)
      md5(event.target.files)
      console.log(state.hash,'hash')
      // createChunk(event.target.files[0])
    }
    const createChunk = async (file,size=5*1024*1024) => {
      let chunkList = []
      let cur = 0
      while(cur < file.size) {
        chunkList.push({file:file.slice(cur,cur+size)})
        cur += size
      }
      state.chunkList = fillParams(file,chunkList)
      chunkList = state.chunkList.map((item,index) => {
        const formData = new FormData()
        formData.append("file", item.file)
        formData.append("fileName",  item.fileName)
        formData.append("chunkName",  item.chunkName)
        return {
          formData,
          index
        }
      }).map(({formData,index}) => {
        return uploadFile(formData,(e) => {
          state.chunkList[index].percent =  parseInt(String((e.loaded / e.total) * 100))
        })
      })
      await Promise.all(chunkList).then(res => {
        setTimeout(() => {
          mergeFile({chunkName: state.chunkList[0].fileName,fileName: file.name}).then(res1=> {
            console.log(res1)
          })
        },2000)
        
      })
    }
    const fillParams = (files,chunkList) => {
      // 截取文件名
      const suffixEq = files.name.lastIndexOf('.')
      const fileName = files.name.slice(0,suffixEq)
      const now = Date.now()
      let chunkFile = chunkList.map(({ file }, index) => ({
        file,
        size: file.size,
        percent: 0,
        chunkName: `${fileName}-${index}`,
        fileName: fileName + now,
        index,
     }))
     return chunkFile
    }
    const md5 = (files, chunkSize = 5*1024*1024) => {
      var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        file = files[0],                            // Read in chunks of 2MB
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
              const res = await verifyFile({key: fileHash})
              console.log(res,'sdfsdfsdfsdf')
              // .then(res => {
                if (res.data.code === 200) {
                  const data = res.data.data
                  if (data.shouldUpload) {
                    createChunk(files[0])
                  } else {
                    ElMessage({
                      message: res.data.msg,
                      type: 'success',
                    })
                  }
                  
                }
              // })
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

    return {
      ...toRefs(state),
      totalPercent,
      tirggerFile
    }
  }
})
</script>

<style scoped lang='scss'>
  
</style>