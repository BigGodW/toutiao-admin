const axios = require('axios')

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
  
})

module.exports = request