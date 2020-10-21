import {request} from "network/request.js"

export function getHomeMultidata(){
    return request({
        url:"/home/multidata"
    })
}

// 需要传参数，类型和页码
export function getHomeData(type,page){
    return request({
        url:"/home/data",
        params:{
            type,
            page
        }
    })
}