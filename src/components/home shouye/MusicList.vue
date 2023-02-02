<template>
<div class="MusicList">
        <div class="MusicTop">
        <div class="title">推荐歌单</div>
        <div class="more">查看更多</div>
        </div>

<div class="MusicContent">
        <!-- 加冒号: ，动态绑定 -->
 <van-swipe :loop="false" :width="150" class="myswipe" :show-indicators="false">
        <!-- 用v-for,循环传入的api数据 -->
  <van-swipe-item v-for="image in state1.images" :key="image">
        <!-- 使用动态绑定，从传入的image中获取它的数据 -->

   <router-link :to="{path: '/ItemMusic',query:{id:image.id}}"  > <!-- 路由跳转，点击封面图片跳转到详情页面 -->
    <!-- 1歌单封面图片 -->
        <img :src="image.picUrl" alt="">
    <!-- 2播放量和图标 -->
        <span class="playcount">
            <!-- 播放量图标 -->
            <!-- <svg class="icon" aria-hidden="true">
            <use xlink:href=" #icon-24gl-playCircle"></use>
            <path ></path>
            </svg> -->
            <svg t="1655260572409" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4203" width="200" height="200"><path d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z" p-id="4204" fill="rgb(255,255,255,0.8)"></path>
            </svg>
            <!-- 播放量 -->
            {{ changecount(image.playCount) }}
        </span>
    <!-- 3底部文字 -->
        <span class="name">{{image.name}}</span>
    </router-link>
   </van-swipe-item>
  </van-swipe>
</div> 

</div>
</template>

<!-- 获取数据 -->
<script>
import {getMusicList } from "@/request请求文件夹/接口获取 api/homeapi.js"
import { onMounted,reactive } from "vue";
import axios from "axios";
export default {
    setup(){
    const state1 = reactive({
        images: []
    });

    function changecount(a){
        if(a>10000)
        return (a/10000).toFixed(1)+'万'
        if(a>100000000)
        return (a/100000000).toFixed(1)+'亿'
    }   

    onMounted(async ()=> {
        let res1 = await getMusicList();
        console.log(res1);
        state1.images = res1.data.result
    })
     /* setup中的数据传出去 */
    return {state1,changecount};
    }
};
</script>

<style lang="less">
.MusicList{
    width: 100%;
    height: 5rem;
    padding: .2rem;
    .MusicTop{
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: .2rem;
        .title{
            font-size: .4rem;
            font-weight: 900;
        }
        .more{
            border: 1px solid #ccc;
            border-radius: .5rem;
            /* 内边距 */
            padding: 0 .2rem;
            /* 文本行内横向居中显示 */
            text-align: center;
            /* 行高设置的和盒子高一样即可让文本垂直居中显示 */
            line-height: 0.6rem;
        }
    }
    /* 自定歌单滑块组件样式 */
    .MusicContent{
        width: 100%;
        height: 3.6rem;
        /* padding-right: 0.2rem; */
        .myswipe{
            /* display: flex;
            flex-direction: column;  */
            width: 100%;
            height: 3.8rem;
            /* padding: 0.2rem; */  
            position: relative;
            img{
                width: 100%;
                height: 2.5rem;
                /* padding-left: 0.1rem;  */
                padding-right: 0.1rem;  
                border-radius: .3rem;
            }
            /* 播放量和图标样式设置 */
            .playcount{
                /* 相对于一个position不是默认值static的盒子定位，上面有relative，
                所以相对myswipe盒子定位 */
                position:absolute;
                /* z轴，正数浮在上面 */
                /* z-index: 100; */
                right: .2rem;
                /* margin-top: 0.05rem; */
                color: rgb(253, 251, 251);
                font-size: 0.25rem;
                align-items: center;
            }
            .icon{
                width: 0.20rem;
                height: 0.20rem;
                /* margin-right: 0.02rem;
                margin-top: 0.05rem; */
                
            }
            .name{
                /* font-size: 20px; */
                display: inline-block;
                height: 1rem;
                width: 100%;
                font-size: 0.27rem;
                line-height: 0.4rem;
                /* 文本居中 */
                /* text-align: center; */
            }
            
        }
    }
}
</style>