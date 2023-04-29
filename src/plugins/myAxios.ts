import axios, {AxiosInstance} from "axios";


//myAxios.defaults.withCredentials = true; // 配置为true
const myAxios: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/"
});

myAxios.defaults.withCredentials = true; // 配置为true

// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    console.log('发请求了',config)
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    console.log('接受请求了',response)
    //未登录跳转到登录页
    if (response?.data?.code === 40100){
        const  redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default myAxios;