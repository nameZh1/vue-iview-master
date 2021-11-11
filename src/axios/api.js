/**
 * 封装axios方法的文件
 *
 */
// 封装axios 的post请求
import axios from 'axios'
export function fetch(url, params, method) {
    if (!method) {
        method = 'post'
    }
    return new Promise((resolve, reject) => {
        //为了兼容生产环境和开发环境请求地址加入‘process.env.API_HOST’
        axios({
            method: method,
            url: process.env.API_HOST + url, //dev.env.js里暴露的API_HOST
            data: params
        })
    }).then(response => {
        switch (response.data.status) {
            case 403:
                router.replace({
                    path: '/login'
                })
        }
        //请求错误
        resolve(response.data);

    })
        .catch((error) => {
            reject(error);
        })
}
