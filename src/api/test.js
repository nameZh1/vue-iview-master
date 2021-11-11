import request from '../plugIns/request'

// 第一个测试
export function oneTest(name, age) {
    return request({
        url:'/AddController',
        method:'post',
        data: {
            name:name,
            age:age
        }
    })
}
