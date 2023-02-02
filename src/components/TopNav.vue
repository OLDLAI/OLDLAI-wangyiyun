<template>
<div class="topNav">
    <div class="topl">
    <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-danlieliebiao"></use>
    </svg>
    </div>
    
    <div class="topContent">
    <span @click="$router.push('/infoUser')" > 我的 </span>
    <span>主页</span>
    <!-- <span>发现</span>
    <span>云村</span>
    <span>视频</span> -->
    </div>

    <div class="topr">
    <svg class="search" aria-hidden="true" @click="$router.push('/search')">
    <use xlink:href="#icon-sousuo"></use>
    </svg>
    </div>
</div>
</template>
<script>
  
</script>
<style lang="less" scoped>
.topNav{
    width: 100%;
    height: 1rem;
    padding: .2rem;
    /* 弹性伸缩盒子 */
    display: flex;
    justify-content: space-between;
    /* 垂直居中 */
    align-items: center;
    //引入less，可以使用样式多层嵌套
    .topContent{
        width: 65%;
        /* 和父元素高度一样 */
        height: 100%;
        display: flex;
        justify-content: space-around;
        /* align-items: center; */
        font-size: 18px;
    }
}
/* 设置左右图标 */
.icon{
  width: .4rem;
  height: .4rem;
}
.search{
  width: .4rem;
  height: .4rem;
  
}
</style>