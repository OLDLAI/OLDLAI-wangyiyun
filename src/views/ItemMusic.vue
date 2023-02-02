<template>
<!-- 绑定父组件元素传递参数，在子组件用props引入子组件中 -->
    <ItemMusicTop :playlist="state.playlist" />
    
    <!-- 额外独立传入播放量数据进去 -->
    <ItemMusicTopList :itemlist="state.itemlist" :subscribedCount = "state.playlist.subscribedCount"/>
</template>
<!-- 获取传递进来的参数 -->
<script>
/* 引入 */
import { useRoute } from "vue-router";
import { onMounted,reactive } from "vue";
import { getMusicItem,getMusicItemList} from "@/request请求文件夹/接口获取 api/item.js";
//引入歌单详情页子组件
import ItemMusicTop from "@/components/Item 详情页/ItemMusicTop.vue";
import ItemMusicTopList from "@/components/Item 详情页/ItemMusicList.vue";


export default  {
    setup(){
        /* 拿到数据后在setup中定义动态数组reactive（state），playlist作为响应式对象接收 */
        const state = reactive({
            /* 进行props传参 */
            /* playlist作为一个对象接受 */
            playlist: {} ,//歌单的详情页的数据

            /* 歌单歌曲数据 */
            itemlist: [] /* 定义成数组形式，是歌单中歌曲的信息，不是对象 */
        });

        onMounted(async ()=> {
            let id = useRoute().query.id;
            /* 1获取歌单详情页 */
            let res = await getMusicItem(id);
            console.log(res);
            /* 让定义的动态数组state中的playlist对象等于获取的数据 */
            state.playlist = res.data.playlist;

            /* 2获取歌曲信息 */
            let gq = await getMusicItemList(id);
            console.log(gq);
            state.itemlist = gq.data.songs
            
        });
        return {state};
    
    
    },

    /* 引入子组件 */
    components: {
        ItemMusicTop,
        ItemMusicTopList,
    },
    
};
</script>
