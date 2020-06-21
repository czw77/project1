


import axios from "axios";


var token = "";
// axios.defaults.baseURL = "http://localhost:1909/";   // 应用的基路径 
axios.defaults.headers.common['token'] = token;     // token 为 空
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


import {Loading, Message } from "element-ui";
var  loadingInstance =  null;


export function  Toast(msg,type,duration){
    var duration = duration || 800;
    var type = type || "success";
    Message({
        type,
        message: msg, 
        center: true,
        duration
    })
}

import router from "@/router"


// axios 拦截器   Interceptors

// 请求 request 拦截器   请求之前业务逻辑 配置 data /headers
axios.interceptors.request.use(function (config) {
    // 请求发送之前做的事情
    // console.log(config);
    token = sessionStorage.token ?  sessionStorage.token : "";
    config.headers['token'] = token;
    loadingInstance = Loading.service({
        lock: true,
        text: '正在加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0)'
    });

    return config;
  }, function (error) {
    console.log("请求失败")
    loadingInstance.close();
    Toast("请求失败-request","error");
    // 请求发送 失败 
    return Promise.reject(error);
    
});

// 响应 response 拦截器   根据返回的状态码 做对应的业务逻辑 
axios.interceptors.response.use(function (response) {
    // 获取到响应数据做的事情
    // console.log(response);


    setTimeout(()=>{
        loadingInstance.close();
        Toast(response.data.msg);
        if(response.data.code=="10000"){  
            router.push({name:'login'});
        }
    },1000)

    return response;
  }, function (error) {
    console.log("响应失败")
    // 无法响应 
    loadingInstance.close();
    Toast("响应失败-response","error");
    return Promise.reject(error);
});



export const  http = axios ;
