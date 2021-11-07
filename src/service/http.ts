import axios, {AxiosPromise, Method} from 'axios';
// import {XY_TOKEN_KEY} from '@/config';
// import {session} from '@/utils/storage';
// import {Message, Notification} from 'element-ui';
import {AxiosRequestConfig} from 'axios/index.d';

// `https://juejin-game.bytedance.com/game/sea1024/game/command?uid=747323638415799&time=

const BASE_URL = 'https://juejin-game.bytedance.com';

// const BASE_URL = typeof process === 'undefined'
//     ? API_BASE_URL
//     : process.env.VUE_APP_API_BASE_URL;
// const instance = axios.create({
//     baseURL: BASE_URL,
// });

// // 添加请求拦截器
// instance.interceptors.request.use(
//     config => {
//         config.headers.token = session.get(XY_TOKEN_KEY);
//         return config;
//     }, error => {
//         Promise.reject(error);
//     },
// );

// // 添加响应拦截器
// instance.interceptors.response.use(
//     response => {
//         session.set(XY_TOKEN_KEY, response.headers.token);
//         console.log(response);
//         if (response.status === 200 && response.data.code === 0) {
//             return response.data.data;
//         }
//         response.data?.message && Message.error(response.data.message);
//         throw new Error(response.data.message);
//     }, error => {
//         if (error.response) {
//             Notification.error('系统错误');
//         }
//         // 对响应错误做点什么
//         throw new Error(error);

//     },
// );


export function http<R>(
    url: string,
    method: Method,
    data = {},
    headers = {},
    baseURL = BASE_URL,
    customConfig?: AxiosRequestConfig,
): AxiosPromise<R> {
    return axios({
        method,
        url,
        baseURL,
        data: method === 'GET' ? void 0 : data,
        params: method === 'GET' ? data : void 0,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            ...headers,
        },
        ...customConfig,
    });
}


export function get<R>(
    url: string,
    data = {},
    headers = {},
    baseURL = BASE_URL,
    customConfig?: AxiosRequestConfig,
): AxiosPromise<R> {
    return http<R>(url, 'GET', data, headers, baseURL, customConfig);
}

export function post<R>(
    url: string,
    data = {},
    headers = {},
    baseURL = BASE_URL,
    customConfig?: AxiosRequestConfig,
): AxiosPromise<R> {
    return http<R>(url, 'POST', data, headers, baseURL, customConfig);
}

