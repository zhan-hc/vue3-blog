import { Request } from '@/utils/request';
// import baseUrl from '@/utils/baseUrl'
 
export function login (parameter: any) {
    return Request.axiosInstance({
        url: `/login`,
        method: 'post',
        data: parameter
    })
}