import { Request } from '@/utils/request';
// import baseUrl from '@/utils/baseUrl'

// 获取博客标签列表
export function getTagList (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/tag/getBlogTagList`,
        method: 'post',
        data: parameter
    })
}

// 添加博客标签列表
export function addBlogTag (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/tag/addBlogTag`,
        method: 'post',
        data: parameter
    })
}

// 更改博客标签列表
export function updateBlogTag (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/tag/updateBlogTag`,
        method: 'post',
        data: parameter
    })
}

// 上下线博客标签
export function onlineBlogTag (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/tag/onlineBlogTag`,
        method: 'post',
        data: parameter
    })
}

// 删除博客标签
export function deleteBlogTag (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/tag/deleteBlogTag`,
        method: 'post',
        data: parameter
    })
}