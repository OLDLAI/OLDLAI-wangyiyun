<template>
<div class="FooterMusic">
    <!-- 左侧名字和图片部分 -->
    <div class="left" @click='gequyemianshow()'>
        <div><img :src="playList[playListIndex].al.picUrl" alt=""/></div>
        <div class="content">
            <p>{{ playList[playListIndex].name }}</p>
        </div>
    </div>
    <!-- 右侧按钮和列表按钮 -->
    <div class="right">
        <svg class="icon" aria-hidden="true" v-if="zantingshow" @click="play">
        <use xlink:href="#icon-bofang1" ></use>
        </svg>

        <svg class="icon" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-weibiaoti--" ></use>
        </svg>

        <svg class="icon" aria-hidden="true" @click="bofanglist1">
        <use xlink:href="#icon-zu"></use>
        </svg>

        <!-- canplay,在浏览器渲染之后且播放器还未播放时执行 --><!-- "`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`" -->
        <audio  @canplay="add()" ref="audio" @timeupdate="updateTime"></audio> 
        
        <van-popup v-model:show="yemianshow" position="bottom" :style="{ height: '100%',weight:'100%'}" >
            <Musicxiangqingye 
             :musicxiangqing = "playList[playListIndex]"
             :play= "play"
             :zantingshow= "zantingshow"
             :arr= "arr" 
             :getLyric= "getLyric"
             :updateTime= "updateTime"
             :add="add"
             :audio="audio"
            ></Musicxiangqingye>
            <!-- 传递歌词数组arr -->
        </van-popup>
    </div>
</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import { onMounted,watch,onUpdated } from 'vue';
import { ref,forEach,reactive } from 'vue';
import { useStore } from 'vuex';
import { musicxiangqingye } from '@/components/musicxiangqingye.vue'
import Musicxiangqingye from './musicxiangqingye.vue'
import { getMusiclyric } from '@/request请求文件夹/接口获取 api/item'
import { huoqumusic,bofanglist } from '@/request请求文件夹/接口获取 api/item';
import axios from 'axios';
export default {
    setup(){
        /* vue3 setup()中没有this，想访问操作dom需要用ref */
        const audio = ref(null);
        const store = useStore();
        /* 定义歌词数组 */
        let arr = ref([])
        let timer = null;//设置一个定时器名字，值为空
        let end = null;
        let temp = ref()

       const bofanglist1 = async ()=>{
           let res = await bofanglist()
           console.log(res)
       }

        const play =  ()=> {
            /* 判断，如果暂停存在，则为暂停状态，点击播放 */
            if(audio.value.paused){
                /* 要加上value才有，必须的 */
                audio.value.play()
                /* 点击后为播放状态，更新zantingshow为false，让暂停按钮显示 */
                store.commit('updatazantingshow',false)
                getLyric() /* 播放就获取歌词 */
                updateTime() /* 播放就实时更新歌曲播放具体时间和歌词 */
                add()
                duration1()
                /* duration2()  */
            }   
            else
            {
                getLyric() /* 播放就获取歌词 */
                updateTime() /* 播放就实时更新歌曲播放具体时间和歌词 */
                add()
                duration1()
                /* duration2() */
                audio.value.pause()
                console.log(audio.value.duration)   
                store.commit('updatazantingshow',true)
                /* 暂停就清除定时器 */
                clearInterval(timer)
                
            }
        }
        
        const gequyemianshow = () => {
            getLyric()
            updateTime()
            add()
            duration1()
            /* duration2() */
            store.commit('updatayemianshow')
        }
        /* 歌词时间获取和使用定时器进行更新 */
        const updateTime = ()=> {
            timer=setInterval(()=>{
                store.commit('updatacurrentTime',audio.value.currentTime)
            },100)//100毫秒调用一次函数
        }

        

        const duration1 = ()=> {
            end = setInterval (()=>{
                if(store.state.currentTime==store.state.duration){
                    /* 歌曲播放序号更新+1 */
                    store.commit('updataplayListIndex',store.state.playListIndex+1)
                    /* 暂停状态改成false，没在暂停，自动变成播放图表，且封面旋转 */
                    store.commit('updatazantingshow',false)
                    console.log(store.state.duration)
                    if(store.state.duration==NaN)
                    {
                        store.commit('updataplayListIndex',store.state.playListIndex+1)
                    }
                    /* store.commit('updataduration',store.state.duration) */
                    temp.value = temp.value+1
            }     
        },1000)//100毫秒调用一次函数
        }

        /* const duration2 = ()=> {
            store.commit('updataduration',store.state.duration)
        } */

        /* 用asyncawait从axios中获取歌词 *//* 用asyncawait从axios中获取歌词 *//* 用asyncawait从axios中获取歌词 */
        const getLyric = async()=>{
            let res = await getMusiclyric(store.state.playList[store.state.playListIndex].id)
            if(!res)
            {
                store.commit('updataplayListIndex',store.state.playListIndex+1)
            }
            store.commit('updatalyricList',res.data.lrc)
            let lyric = res.data.lrc.lyric
            if(lyric){  
                    arr.value =  lyric.split(/[(\r\n)\r\n]+/).map(item => {
                    let min = item.slice(1, 3)
                    let sec = item.slice(4, 6)
                    let mill = item.slice(7, 10)
                    let time = parseInt(min)*60 + parseInt(sec) + parseInt(mill)/1000
                    /* 开头的作者和结尾的制作公司毫秒数是三位的，所以用歌词用indexOf而不是数字来确认开头 */
                    let lrc = item.slice(item.indexOf(']')+1, item.length)
                    return { min, sec, mill, lrc,time }
                });
                arr.value.forEach((item,i) => {
                    /* 如果歌词到了最后一句，歌词的下一句值为0，不再赋值 */
                    /* 定义一个新的属性，等于arr中time属性 */
                    if(i==arr.value.length-1 )
                    {
                        item.next1 = 100000
                    }
                   /*  当前句子的下一句的时间，i+1下一句 */
                    else
                    item.next1 = arr.value[ i+1 ].time
                });

            }
            
        }
        
        const add = ()=>{
            store.commit('updataduration', audio.value.duration)
            getLyric()
        }
        
        const audioaddurl = async() =>{
        let res1 = await huoqumusic(store.state.playList[store.state.playListIndex].id)
        /* store.state.url = res1.data.data[0].url */
        store.commit('updateUrl',res1.data.data[0].url)
        audio.value.src = res1.data.data[0].url
        }

        /* console.log(audio.value)
        let duration = audio.value.duration */
        /* const lyricContent = ()=>{
            let lyric = 
        } */
        
        /* 监听，当歌曲id改变时更换播放的歌曲并且自动播放 */
        /* vue3的watch写法，监听值的子属性时要是一个函数形式 */
        /* watch(()=>store.state.url, ()=> {
            audioaddurl()
        }) */
        watch(()=>store.state.id, ()=> {
            audioaddurl()
            audio.value.autoplay = true;
            /* store.commit('updatalyricList', store.state.playList[store.state.playListIndex].id) */

            /* 如果是暂停状态，就点一下改变图表，正在播放着中就不改 */
            if(audio.value.paused){
                store.commit('updatazantingshow',false)
            }
        })
        watch(()=>store.state.playListIndex, async ()=> {
            /* store.commit('updatalyricList', store.state.playList[store.state.playListIndex].id) */
            audio.value.autoplay = true;
            let res1 = await huoqumusic(store.state.playList[store.state.playListIndex].id)//加上audio的url变化
            audio.value.src = res1.data.data[0].url
            /* 如果是暂停状态，就点一下改变图表，正在播放着中就不改 */
            if(audio.value.paused){
                store.commit('updatazantingshow',false)
            }
        })
        /* 监听是否点击搜索歌曲，搜索后点击歌曲会添加到最末尾，长度改变 */
        watch(()=>store.state.playList.length, ()=> {
            audio.value.autoplay = true;
            /* store.commit('updatalyricList', store.state.playList[store.state.playListIndex].id) */

            /* 如果是暂停状态，就点一下改变图表，正在播放着中就不改 */
            if(audio.value.paused){
                store.commit('updatazantingshow',false)
            }
        })

        return {
            play,
            audio,
            gequyemianshow,
            getLyric,
            arr,
            updateTime,
            timer,
            add,
            end,
            duration1,
            temp,
            audioaddurl,
            bofanglist1,
            /* duration2 */
        }
    },
    computed: {
        ...mapState([
            'playList',
            'playListIndex',
            'zantingshow',
            'yemianshow',
            'lyricList',
            'duration',
            'currentTime',
            'url'
        ]),
        ...mapMutations([
            'updatazantingshow',
            'updatayemianshow',
            'updatalyricList',
            'updatacurrentTime',
            'updataduration',
            'updataplayListIndex',

        ])
    },
    components:{
    musicxiangqingye,
    Musicxiangqingye
}   
};
</script>

<style lang="less" scoped>
    .FooterMusic{
        width: 100%;
        height:1.3rem;
        background-color: #fff;
        border-top: 1px solid #999;
        display: flex;
        /* 把播放器固定在页面底部 */
        position: fixed;
        bottom: 0;
        padding: 0.2rem;
        justify-content: space-between;
        
        .left {
            width: 60%;
            height: 100%;
            display: flex;
            left: 0;
            align-items: center;
            img{
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }
            .content{
                display: flex;
                margin-left: 8px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                /* white-space: nowrap; */
            }
        }
        .right {
            width: 20%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .icon {
                width: 0.6rem;
                height: 0.6rem;
            }
        }
    }

</style>