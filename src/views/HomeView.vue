<!-- 此为home页显示界面，把编好的子组件加入到这里面  -->
<template>
  <div class="home">
  <!-- 在template中引入子组件 -->
  <TopNav/>
  <!-- 轮播图标签 -->
  <SwpierTop/>
  <!-- 图表列表子组件 -->
  <IconList/>
  <!-- 发现好歌单组件 -->
  <MusicList/>
  </div>
</template>

<script>
// @ is an alias to /src
//把顶部导航栏子组件引入home中
import TopNavVue from '@/components/TopNav.vue'
import TopNav from '@/components/TopNav.vue'
//引入轮播图子组件
import SwpierTopVue from '@/components/home shouye/SwpierTop.vue'
import SwpierTop from '@/components/home shouye/SwpierTop.vue'
//引入四个图标组成的列表子组件
import IconListVue from '@/components/home shouye/IconList.vue'
import IconList from '@/components/home shouye/IconList.vue'
//引入发现好歌单组件
import MusicList from '@/components/home shouye/MusicList.vue'


export default {
  name: 'HomeView',
  //注册子组件
  components: {
    TopNavVue,
    TopNav,
    SwpierTopVue,
    SwpierTop,
    IconList,
    MusicList
},
}
</script>
