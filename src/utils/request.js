const axios = require('axios')

const request = axios.create({
  baseURL:'http://ttapi/research.itcast.cn'
})

module.exports = request