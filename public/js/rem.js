function remSize(){
    //获取设备的宽度 
    var deviceWidth=document.documentElement.clientWidth
    if(deviceWidth>=750)
    deviceWidth=750
    if(deviceWidth<=375)
    deviceWidth=375
    //750px 1rem 是100px 字体大小最大是100px，最小是50px
    //设置html的字体大小
    document.documentElement.style.fontSize=(deviceWidth/7.5)+'px'
    //设置body里的字体大小
    document.querySelector('body').style.fontSize=0.3+"rem"
}
remSize()
// onresize 是当浏览器被重置大小时执行的Javascript代码
window.onresize=function(){
    remSize()
}