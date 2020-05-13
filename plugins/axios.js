
'use strict'

import axios from 'axios'
import Qs from 'qs'
import des from './des'

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  baseURL: require('../config/index').baseUrl,
  timeout: 10000,
  // withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache,no-store,max-age=-1,private',
    'Content-Type': 'application/json;charset=utf-8'
  }
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // 判断是否为客户端
    if (process.client) {
      config.headers.authorization = des.decryptDes(localStorage.getItem('userInfo')).token || ''
    }
    // Do something before request is sent
    if (config.method.toLowerCase() === 'get' && config.params) {
      config.paramsSerializer = function (params) {
        return Qs.stringify(params)
      }
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default _axios
