import { Request } from '@/utils/request';
// import baseUrl from '@/utils/baseUrl'
 
export function uploadFile (parameter: any) {
    return Request.axiosInstance({
        url: `/upload`,
        method: 'post',
        data: parameter,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${sessionStorage.getItem('token')}`
        }
    })
}