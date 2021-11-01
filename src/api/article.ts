import { Request } from '@/utils/request';
// import baseUrl from '@/utils/baseUrl'

// 获取博客标签列表
export function getArticleList (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/article/getBlogArticleList`,
        method: 'post',
        data: parameter
    })
}

// 添加博客标签列表
export function addBlogArticle (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/article/addBlogArticle`,
        method: 'post',
        data: parameter
    })
}

// 更改博客标签列表
export function updateBlogArticle (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/article/updateBlogArticle`,
        method: 'post',
        data: parameter
    })
}

// 上下线博客标签
export function onlineBlogArticle (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/article/onlineBlogArticle`,
        method: 'post',
        data: parameter
    })
}

// 删除博客标签
export function deleteBlogArticle (parameter: any) {
    return Request.axiosInstance({
        url: `/blog/article/deleteBlogArticle`,
        method: 'post',
        data: parameter
    })
}
// 增加阅读量
export function addArticleReading (parameter: any) {
  return Request.axiosInstance({
      url: `/blog/article/addArticleReading`,
      method: 'post',
      data: parameter
  })
}