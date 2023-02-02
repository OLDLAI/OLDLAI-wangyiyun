import service from "../create实例";
let token = localStorage.getItem("token")
let token1 = encodeURIComponent(token)
/* 定义一个函数,调用自定义实例，并用get方法获取首页轮播图数据 */
/* 在methods中直接定义 */
export function getBanner(){   
    return service({
        method:"GET",
        url:"/banner?type=2",
        
    })
}

/* 获取发现好歌单 */
export function getMusicList(){
    return service({
        method:"GET",
        url:"/personalized?limit=20",
       
    })
}

/* 搜索接口 */
export function getSearchMusic(data){
    return service({
        method:"GET",
        url:`/cloudsearch?keywords=${data}`,
       
    })
}

/* 登陆接口 */
/* 登陆状态，要放在全局里面操作，所以使用vuex状态管理action异步获取 */
export function getphonelogin(data){
    return service({
        method:"GET",
        /* url:`/login/cellphone?phone=&password=`,  */
        /* url:`/login/cellphone?phone=${data.phone}&password=${data.password}` */
        url:`/login?email=${data.phone}&password=${data.password}`,
        
    })
}

/* 发送验证码 */
export function getyanzhengma(data){
    return service({
        method:"GET",
        /* url:`/login/cellphone?phone=&password=`,  */
        url:`/captcha/sent?phone=${data}`,
        
    })
}

/* 注销 */
/* export function cancel(){
    return service({
        method:"GET",
       
        url:`/logout`, 
    })
} */
export function qrCodeLoginKey(timestamp){
    return service.get('/login/qr/key?timestamp='+timestamp)
}
export function qrCodeLoginImg(key){
    return service.get('/login/qr/create?qrimg=true&key='+key)
}
export function qrCodeLoginCheck(key,timestamp){
    return service.get('/login/qr/check?key='+key+'&timestamp='+timestamp)
}

export function jianyan(){
    return service({
        method:"GET",
        url:`/login/status`,
    })
}

export function bofanglist(){
    return service({
        method:"GET",
        url:`/record/recent/song?limit=1`,
    })
}

//获取用户登陆详情
export function getLoginUser(data){
    return service({
        method:"GET",
        url:`/user/detail?uid=${data}`
    })
}