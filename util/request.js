var axios = require('axios')
// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers['Platform'] = 'web'
// 创建axios实例
const request = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    // 超时
    timeout: 10 * 1000,
})

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 让每个请求携带自定义token 请根据实际情况自行修改
        // if(localStorage.getItem('userInfo')){
        //   config.headers['Authorization'] = 'bearer '+JSON.parse(localStorage.getItem('userInfo')).token
        // }
        return config;
    },
    error => {
        console.log('err：' + error);
        return Promise.reject(error);
    }
)

//响应拦截器
request.interceptors.response.use(
    response => {
        return Promise.resolve(response) 
    },
    error => {
        return Promise.resolve(error) 
    }
)
module.exports = {
    request
};