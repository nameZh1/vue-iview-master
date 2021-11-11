// // 创建一个 axios 实例
import axios from 'axios'
import Qs from 'qs'; // 请求参数处理


// axios.defaults.withCredentials=true
const service = axios.create({

    baseURL: "http://localhost:8080",// 看后端接口
    timeout: 5000,// 配置请求超时时间
    withCredentials: false, // 是否包含cookie
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

// 添加请求拦截器
service.interceptors.request.use(
    config => {
        if (config.data) {
            config.data = Qs.stringify(config.data); // 参数转换
        }
        // 在发送请求之前做某事，比如说 设置token
        // config.headers['token'] = 'token';
        // config.headers['X-Token'] = 'xxxxxxxxxxxxxxxxxxx';
        return config;
    }, error => {
        // 请求错误时做些事
        return Promise.reject(error);
    });

// 添加响应拦截器
service.interceptors.response.use(
    response => {
        // dataAxios 是 axios 返回数据中的 data
        const res = response.data;
        // console.log(res.state)
        // 这个状态码是和后端约定的
        // const { code } = res;
        // 如果返回的状态不是200 就主动报错
        if (res.state !== "ok") {
            return Promise.reject(res.message || 'error')
        }
        return response;
    }, error => {
        return Promise.reject(error.response.data); // 返回接口返回的错误信息
    })
//使别的地方可以调用
export default service
