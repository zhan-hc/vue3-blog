import { Request } from '@/utils/request';
// import baseUrl from '@/utils/baseUrl'
 
export function getTagList (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/tag/getBlogTagList`,
        method: 'post',
        data: parameter
    })
}