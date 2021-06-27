import request from '@/utils/request'

export const getArticles = (params)=>{
  return request({
    method:'get',
    url:'/mp/v1_0/articles',
    params
  })
}
export const getChannels = ()=>{
  return request({
    method:'get',
    url:'/mp/v1_0/channels'
  })
}
export const addArticle = (data,draft)=>{
  return request({
    method:'post',
    url:"/mp/v1_0/articles",
    params:{
      draft
    },
    data
  })
}