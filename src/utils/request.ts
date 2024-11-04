// api.ts
import axios, {
    type InternalAxiosRequestConfig,
    type AxiosResponse,
} from "axios";
import {ElMessage} from "element-plus";

// 创建 Axios 实例
const service = axios.create({
    baseURL: 'http://10.0.3.138:8080', // 替换为你的后端地址
    timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 可以在这里添加认证 token 等
        if (localStorage.getItem("token") || "") {
            config.headers.Authorization = localStorage.getItem("token") || "";
        }
        return config;
    },
    (error) => {
        ElMessage.error(error.message);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data; // 直接返回数据
    },
    (error) => {
        ElMessage.error(error.message);
        return Promise.reject(error);
    }
);

export default service;

