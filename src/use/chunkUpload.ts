import {uploadFile, mergeFile, verifyFile} from '@/api/common'
import { reactive,computed } from 'vue'
export default function md5Fun () {

  
  const state =reactive({
    chunkList: [],
    hash: ''
  })

  return {
    
  }
}