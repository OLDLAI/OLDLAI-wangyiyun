/* 建立插件文件夹，统一管理引入的组件 */
/* 引入轮播图组件库 */
import { Swipe, SwipeItem,Popup,Progress,Slider } from 'vant';
//把引入进来的组件都放入一个数组中
let plugins=[Swipe, SwipeItem,Popup,Progress,Slider]
//定义一个函数，导出函数到main里调用
export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}

