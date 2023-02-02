<template>
<!-- 入口文件 -->
<!-- 留下路由站位符 -->
  <router-view/>
  <FooterMusic  v-show="isFoot"/>
</template>

<script>
import FooterMusic from './components/FooterMusic.vue';
import { useStore } from 'vuex';
import { mapState } from 'vuex';
 export default {
  /* 底部播放器是全局组件，使用在App.vue中注册一个 */
    setup(){
      const store = useStore()
      let isFoot =store.state.isFoot
      return {
        isFoot
      }
    },
    computed:{
      ...mapState([
        'isFoot'
      ])
    },
    components:{
      FooterMusic
    }
 }
</script>

<style lang="less">
//设置全局样式
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a{
  color:rgb(6, 5, 5);
}
</style>
