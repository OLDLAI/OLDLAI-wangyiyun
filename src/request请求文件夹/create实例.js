/* 封装axios，可以方便的调用get的时候可以直接使用create中的基础路径
1. axios.create() 先创建一个实例，里面包含了基础路径，以后可以直接调用
2. 使用axios.get的时候可以直接合并自定义实例 */

/* 创建自定义实例 */
/* 调用axios */
import axios from 'axios';
let service = axios.create ({
    baseURL:"http://localhost:3000",
    /* 返回时间 */
    timeout: 30000,
    withCredentials:true,
})

/* 把自定义实例暴露出去 */
/* 请求拦截器 */
service.interceptors.request.use(
    (config) =>{
      /* 请求头携带sessionstroage中的保存的token */
     /*  return config */
     /* if(window.sessionStorage.token) {
      config.headers.token = window.sessionStorage.token
      console.log(config)
     }
     let token = localStorage.getItem("token")
        if(token){
            config.headers.Authorization = token;
            console.log(config)
        } */
        return config;   
    }, error => {
      return Promise.reject(error)
    }
)
//响应拦截器
service.interceptors.response.use(
  response => {
    if (response) {
      switch (response.status) {
        case 200: break;
        // case 'B1000':                                 //  清除token信息并跳转到登录页面
        //   sessionStorage.removeItem('Authorization')  // 将token清空
        //   Message.error(response.data.data.msg)       // 提示错误信息
        //   router.replace({ path: '/login' })
        //   break;
        default:
          Message.error(response.data.data.msg ? response.data.data.msg : '返回状态非200')
      }
      return response
    } else {
      Message.error('响应成功，但是响应信息不存在！')
    }
  },
  error => {
    Message.error(ENV === 'development' ? error.message : '请求错误！')
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  })
export default service