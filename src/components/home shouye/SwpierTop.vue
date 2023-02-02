<!-- 顶部轮播图组件 -->
<template>
<div class="SwpierTop">
  <van-swipe :autoplay="3000" lazy-render>
  <van-swipe-item v-for="image in state.images" :key="image">
    <img :src="image.pic" />
  </van-swipe-item>
  </van-swipe>
</div>
</template>
<!--1引入axios
    2如果想在vue3componentapi的setup中用周期函数需要引用 -->
<!-- import axios from axios
import { onMounted } from 'vue' -->
<script>
 import axios from 'axios' 
 import {reactive,onMounted} from 'vue'
 import {getBanner} from '@/request请求文件夹/接口获取 api/homeapi.js'
export default {
  setup() {
    const state = reactive({ 
      images : [
      'https://fastly.jsde0livr.net/npm/@vant/assets/apple-1.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ],
  });
    /* async await 等待异步请求成功的返回的结果 */
    onMounted(async ()=> {
       /* axios.get('http://localhost:3000/banner?type=2').then((res)=>{
         console.log(res);
         state.images=res.data.banners
         console.log(state.images);
       }) */
       /* axios是基于promise的异步http请求库，所以asyncawait正好用上 */
       /* await代替了.then（猜测） */
      let res = await getBanner();
      state.images = res.data.banners;
      /* console.log(res) */
    });
    //返回响应式对象
    return {state};
  },
};
</script>

<style lang="less">
.SwpierTop{
.van-swipe{
    width: 100%;
    height: 3rem;
    .van-swipe__track{
      //图片所在盒子大样式
      .van-swipe-item{
        padding: 0 0.2rem;
        img{
          width: 100%;
          height: 100%;
          /* 定义图的圆角边框 */
          border-radius: 0.2rem;
        }
      }
    }
}
.van-swipe__indicator--active{
  background-color: rgb(190,11,11);
}
}
</style>