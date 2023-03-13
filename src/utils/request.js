

import axios from "axios"


const http = axios.create({
    //通用请求的地址
    baseURL: "/api",
    //超时
    timeout: 7000,
})

//请求拦截器
http.interceptors.request.use(function(config){
    //成功做什么
    
    return config
},function(error){

    return Promise.reject(error)
})

//响应拦截器
http.interceptors.response.use(function(config){
    //成功做什么
    
    return config
},function(error){

    return Promise.reject(error)
})


export default http
