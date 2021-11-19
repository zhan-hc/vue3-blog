import { Request } from '@/utils/request';
// import baseUrl from '@/utils/baseUrl'

// 获取博客标签列表
export function getCategoryList (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/category/getBlogCategoryList`,
        method: 'post',
        data: parameter
    })
}

// 添加博客标签列表
export function addBlogCategory (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/category/addBlogCategory`,
        method: 'post',
        data: parameter
    })
}

// 更改博客标签列表
export function updateBlogCategory (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/category/updateBlogCategory`,
        method: 'post',
        data: parameter
    })
}

// 上下线博客标签
export function onlineBlogCategory (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/category/onlineBlogCategory`,
        method: 'post',
        data: parameter
    })
}

// 删除博客标签
export function deleteBlogCategory (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/category/deleteBlogCategory`,
        method: 'post',
        data: parameter
    })
}