const axios = require('axios')

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
  
})

// 请求拦截器
request.interceptors.request.use(
  (config)=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      config.headers.authorization =`Bearer `+user.token
    }
    return config
    
  },
  (err)=>{
    return Promise.reject(err)
  }
)

module.exports = request