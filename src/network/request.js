import axios from "axios"

export function request(config) {
    const instances = axios.create({
        // baseURL: "http://123.207.32.32:8000",
        baseURL:'http://152.136.185.210:8000/api/w6',
        timeout:5000
    });
    instances.interceptors.request.use(res => {
        return res;
    }, err => {
        console.log(err);
    });
    instances.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    });
    return instances(config)
}