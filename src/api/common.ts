import { Request } from '@/utils/request';
// import baseUrl from '@/utils/baseUrl'

type callBack = (data:any) => void;
export function uploadFile (parameter: any,cb:callBack,cancelToken:any) {
    return Request.axiosInstance({
        url: `/blog/upload/file`,
        method: 'post',
        data: parameter,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress:cb,
        cancelToken
    })
}
export function mergeFile (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/upload/mergeChunkFile`,
        method: 'post',
        data: parameter
    })
}
export function verifyFile (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/upload/verifyFile`,
        method: 'post',
        data: parameter
    })
}