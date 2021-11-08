import { Request } from '@/utils/request';
// import baseUrl from '@/utils/baseUrl'
 
export function getUserInfo (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/user/getBlogUserInfo`,
        method: 'post',
        data: parameter
    })
}

export function updateUserInfo (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/user/updateBlogUserInfo`,
        method: 'post',
        data: parameter
    })
}