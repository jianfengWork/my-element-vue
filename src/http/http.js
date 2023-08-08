import axios from 'axios'
import { Message } from 'element-ui'
axios.defaults.timeout = 30000

// http request Authorization
axios.interceptors.request.use(
  config => {
    // config.headers = {
    //   'Content-Type': 'application/json;charset=utf-8'
    // }
    config.headers['Authorization'] = localStorage.getItem('Authorization') || null
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response || null
  },
  err => { // 超时之后在这里捕抓错误信息
    if (err.response) {
      if (err.response.status === 502) {
        err.response = {data: {error: {message: '服务器忙碌中'}}}
        setTimeout(function () {
          // window.location.reload()
        }, 5000)
        return Promise.reject(err.response)
      }
    } else if (err.request) {
      if (err.request.readyState === 4 && err.request.status === 0) {
        err.response = {data: {error: {message: '请求超时'}}}
        setTimeout(function () {
          // window.location.reload()
        }, 5000)
        return Promise.reject(err.response)
      }
    }
    if (err.response.status === 401) { // 重定向
      // window.location.href = err.response.data.error.message
      return false
    }
    if (err.response.status === 503) {
      // window.location.href = '/error'
      return false
    }
    if (err.response.data.error.message === '未知错误') {
      err.response.data.error.message = '服务器出错'
    }
    if (err.response.data.error.message.indexOf('未登录') !== -1) {
      // window.location.href = '/'
    }
    return Promise.reject(err.response)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
    .then(response => {
      resolve(response.data)
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}, timeout) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, {timeout: timeout})
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'delete',
      url: url,
      data: data
    }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export function fileDownLoad(path) {
  let urls = path.split('/')
  axios.create().get(path,{
    responseType: 'blob'
  }).then(res => {
    let blob = new Blob([res.data], {type:'application/download'})
    let objectUrl = URL.createObjectURL(blob)
    let a = document.createElement('a')
    a.download = urls[urls.length-1]
    a.href = objectUrl
    a.click()
  }).catch(e => {
    Message.error(e)
  })
}
