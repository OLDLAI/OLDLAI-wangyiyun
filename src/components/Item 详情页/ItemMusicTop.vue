<template>
<div>
<div class = 'itemMusicTop'>
    <!-- 背景图片 -->
    <img :src="playlist.coverImgUrl" alt="" class="bgimg"/>
    <!-- 顶部左边 -->
    <div class="itemLeft">
        <!-- 返回箭头 -->
        <!-- 使用$router.go(-1)返回上一页面 -->
       <svg @click='$router.go(-1)' t="1656634762245" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2279" width="200" height="200"><path d="M862.485 481.154H234.126l203.3-203.3c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0L135.397 489.373c-12.497 12.497-12.497 32.758 0 45.254l256.774 256.775c6.249 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372c12.497-12.497 12.497-32.759 0-45.255l-203.3-203.301h628.36c17.036 0 30.846-13.81 30.846-30.846s-13.81-30.846-30.846-30.846z" fill="" p-id="2280"></path>
       </svg>

       <span>歌单</span>
       
    </div>
    <!-- 顶部右边 -->
    <div class="itemRight">
        <!-- 搜索 -->
        <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
        </svg>
        <!-- 列表 -->
        <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-danlieliebiao"></use>
        </svg>
    </div>
</div> 
    
    <!-- 歌单详情页顶部文本内容部分 -->
    <div class="itemMusicTopContent"> 
        <div class="contentLeft">
            <img :src="playlist.coverImgUrl" alt="" />
            <div class="count">
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-whiteplayCircle"></use>
                </svg>
                <span>{{ changeValue(playlist.playCount) }}</span>
            </div>
        </div>

        <div class="contentRight">
            <p class="rightP_one">{{ playlist.name }}</p>
            <div  class="right_img">
                <img v-if = "playlist.creator" :src="playlist.creator.backgroundUrl" alt="" />
                <span v-if = "playlist.creator">{{ playlist.creator.nickname }}</span>
                
                <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-youjiantou"></use>
                </svg> -->
            </div>

            <p class="rightP_two">
            <span>{{ playlist.description }}</span>
            <!-- <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
            </svg> -->
            </p>
        </div>  
    </div>

<!-- vue2中只能有一个根元素，但是3中不需要了 -->
<div class="itemMusicTopFooter">
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiaoxi"></use>
            </svg>
            <span>{{ playlist.commentCount }}</span>
        </div>

        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span>{{ playlist.shareCount }}</span>
        </div>

        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai"></use>
            </svg>
            <span>下载</span>
        </div>

        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-show_duoxuan"></use>
            </svg>
        <span>多选</span>
        </div>
</div>
</div>



</template>
<script>
//使用props进行传参渲染页面以及对歌单详情页的背景处理
//子组件接收父组件传递进来的参数
export default {
    /* vue3.0 setup(props,context) */
    //接收传递进来的父组件参数,传进来网易云歌单数据，下一步进行渲染
    props:["playlist"],
    
    setup(props){
        function changeValue(num) {
            let res = 0;
            if(num>=100000000)
            {
                res = (num/100000000).toFixed(2) + "亿";
            }
            else if(num>=10000)
            {
                res = (num/10000).toFixed(2) + "万";
            }
            return res;
        }
        return{changeValue}
    },
};

</script>

<style lang="less" scoped>
.itemMusicTop{
    display: flex;
    width: 100%;
    height: 1rem;
    justify-content: space-between;
    align-items: center;
    /* 外边距 */
    //padding:  .1rem;
    position: relative;
    .itemLeft , .itemRight{
        display: flex;
        width:25% ;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        margin: 0 0.2rem;
        span{
        font-size: .35rem;
        color: #fff;
        }
        .icon{
        padding: .2rem;
        fill: #fff;
        }
        .icon1{
        padding: .2rem;
        fill: #fff;
        }
    }
   
    .bgimg{
        width: 100%;
        height: 10rem;
        position: absolute;
        z-index: -1;
        filter: blur(30px);
    }
}

.itemMusicTopContent{
    width: 100%;
    height: 3rem;
    padding: 0.2rem;
    margin-top: 0.4rem;
    display: flex;
    justify-content: space-between;
    
    .contentLeft {
        width: 36%;
        height: 2.6rem;
        position: relative;

        img{
            width: 2.6rem;
            height: 2.6rem;
            border-radius: 0.2rem;
            position: absolute;
            z-index: -1;
        }

        .count {
            position: absolute;
            right: 0.1rem;
            margin-top: 0.1rem;
            .icon{
                width: 0.26rem;
                height: 0.26rem;
                /* margin-top: -0.02rem; */
                /* 定义垂直排列的 */
                vertical-align: middle;
            }
            span {
            font-size: 0.26rem;
            color: #fff;
            }
        }
    }

    .contentRight{
        width: 60%;
        height: 2.6rem;
        display: flex;
        /* 主轴为垂直方向 */
        flex-direction: column;
        justify-content: space-between;

        .rightP_one{
            font-size: 0.3rem;
            color:#fff;
            font-family: "微软雅黑";
        }

        .right_img{
            width: 100%;
            height: 0.6rem;
            /* 行高和高度一样是居中 */
            line-height: 0.6rem;
            color: #ccc;

            img{
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                vertical-align: middle;
            }

            span{
                margin-left: 0.1rem;
                font-size: 0.1rem;
            }

            .icon{
                width: 0.25rem;
                height: 0.25rem;
                /* margin-top: -0.08rem; */
                vertical-align: middle;
                color: #ccc;
            }
        }

        .rightP_two {
            width: 100%;
            height: 0.6rem;
            display: flex;
            align-content: center;
            justify-content: space-around;
            span{
                display: inline-block;
                width: 95%;
                height: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: .24rem;
                color: #ccc;
            }

            .icon{
                width: 0.24rem;
                height: 0.24rem;
                color: white;
            }
        }
    }
}

.itemMusicTopFooter{
        width: 100%;
        height: 1.4rem;
        display: flex;
        justify-content: space-around;
        /* margin-top: .2rem; */

    .footerItem{
    display: flex;
    flex-direction: column;
    align-items: center;
    /* color: #fff; */
    .icon{
      fill: #fff;
      width: 0.5rem;
    }
    span{
      margin-top: .1rem;
      color: rgba(255, 255, 255)
    }
  }
    }
</style>