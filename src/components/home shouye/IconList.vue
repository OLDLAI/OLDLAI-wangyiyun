<!-- 四个图表组件的样式 -->
<template>
    <div class="iconList">
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liuhangpaihangbang"></use>
            </svg>
            <!-- 图标名称 -->   
            <span>每日推荐</span>
        </div>

        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinlechangpian"></use>
            </svg>
            <!-- 图标名称 -->
            <span>私人FM</span>
        </div>

        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gedan"></use>
            </svg>
            
            <!-- 图标名称 -->
            <span>歌单</span>
        </div>

        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <!-- 图标名称 -->
            <span>排行榜</span>
        </div>
        
    </div>
</template>

<style lang="less">
    .iconList{
        width: 100%;
        height: 2rem;
        display: flex;
        /* 水平布局，左右间隔一样*/
        justify-content: space-around;
        /* 垂直布局，水平居中 */
        align-items: center;
        /* 四个子图标的样式 */
        .iconItem{
            margin-top: 0.5rem;
            width: 25%;
            height: 100%;
            display: flex;
            /* 弹性布局，盒子内垂直显示到列中 */
            flex-direction: column;
            align-items: center;
        }
        .icon{
            width: 1rem;
            height: 1rem;
        }
    }
    .icon {
        width: 1rem;
        height: 1rem;
    }
</style>