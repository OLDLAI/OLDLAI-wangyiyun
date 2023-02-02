<template>
    <div class="searchtop">
    <svg @click='$router.go(-1)' t="1656634762245" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2279" width="200" height="200"><path d="M862.485 481.154H234.126l203.3-203.3c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0L135.397 489.373c-12.497 12.497-12.497 32.758 0 45.254l256.774 256.775c6.249 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372c12.497-12.497 12.497-32.759 0-45.255l-203.3-203.301h628.36c17.036 0 30.846-13.81 30.846-30.846s-13.81-30.846-30.846-30.846z" fill="" p-id="2280"></path>
    </svg>
    <input class="input1" type="text" v-model="word"  ><!-- @keydown.enter="debounce()" -->
    </div>
    <div class="seaechhistory">
        <span class="spanh1">搜索历史：</span>
    <!-- 拿item去搜索 -->
    <span v-for="item in state.wordlist" :key="item" class="spanh2" @click="search(item)">{{ item }}</span>
    <svg class="icon1" aria-hidden="true" @click="del">
        <use xlink:href="#icon-shanchu" ></use>
    </svg>
    </div>
    
    <!-- 和歌单详情页相似 -->
    <div class="itemList">
        <div class="item" v-for="(item,i) in state.musiclist" :key="i">    
            <!-- 传入i，序号进入方法中，点击具体歌曲可以得到相应序号 -->
            <div class="itemLeft" @click="updataindex(item)" >
                <!-- 歌曲编号，key从0开始，所以加1 -->
                <span class="leftSpan">{{ i + 1 }}</span>
                <div>
                    <!-- 歌曲名字 -->
                    <p>{{item.name}}</p>
                    <span v-for="(item1,index) in item.artists" :key="index">
                    <!-- 作者名字 -->
                    {{item1.name}}
                    </span>
                </div>
            </div>

            <div class="itemRight">
                <!-- 判断，v-if 如果有mv就显示 -->
                <svg class="icon bofang" aria-hidden="true" v-if="item.mvid !=0">
                <use xlink:href="#icon-shipin"></use>
                </svg>
                <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-danlieliebiao"></use>
                </svg>
            </div>
        </div>
    </div>


</template>

<script>
import {ref,reactive,onMounted,watch} from 'vue';
import { getSearchMusic } from '@/request请求文件夹/接口获取 api/homeapi';
import store from '@/store';
import { mapMutations,mapState } from 'vuex';
import musicxiangqingyeVue from '@/components/musicxiangqingye.vue';
import { useStore } from 'vuex';
import{ play } from '../components/FooterMusic.vue'
   export default {
    
    setup(){
            /* 想要reactive定义的数组可以实时更新，就得定义属性名，在后期赋值才可以实时更新 */
            /* let state = reactive([]) */
            /* 要用reactive定义，ref不行 */
            const store = useStore()
            let state = reactive({
                wordlist:[],
                musiclist:[],
            })
            const word = ref()  
            /* let musiclist = ref() */
            /* const musiclist = ref() */

            /* 数组的使用，需要JSON.parse */ /* 加一个判断，在创建的时候wordlist得存在，如果没有值就赋一个空数组 */
            state.wordlist = JSON.parse(localStorage.getItem('wordlist')) ?JSON.parse(localStorage.getItem('wordlist')) :[]
            
             const enter = async ()=> {
                /* if(!word.value)
                {
                    word.value= 'A-SOUL'
                    state.wordlist.unshift(word.value)
                    wordlist = [...new Set(wordlist)]
                    限制搜索的个数
                    if(state.wordlist.length>10)
                    {
                        state.wordlist.pop();
                    }
                    let res = await getSearchMusic(word.value)
                    localStorage.setItem("wordlist", JSON.stringify(state.wordlist));
                
                }
                else{ */
                /* 读写ref需要value，复杂 */
                /* js 中必须要加 .value ，在模板中又不需要加 .value，这无疑造成了一定程度的混乱和割裂感。 */
                if(word.value){
                state.wordlist.unshift(word.value)
                /* 把搜索记录保存到本地存储中 */
                localStorage.setItem("wordlist", JSON.stringify(state.wordlist));
                /* wordlist = [...new Set(wordlist)] */
                /* 限制搜索的个数 */
                    if(state.wordlist.length>10)
                    {
                        state.wordlist.pop()
                    }
                //}
                
                /* 获取接口搜索数据 */
                /* 用asyncawait来把axios返回的异步promise变成同步的 */
                let res = await getSearchMusic(word.value)
                console.log(res);
                state.musiclist = res.data.result.songs
                }
            }
            
            const del = ()=> {
                localStorage.removeItem('wordlist');
                state.wordlist = [];
                state.wordlist = JSON.parse(localStorage.getItem('wordlist')) ?JSON.parse(localStorage.getItem('wordlist')) :[]
            }

            /* 搜索记录实现搜索歌曲，也是asyncawait */
            const search= async (item)=>{
                let res = await getSearchMusic(item)
                console.log(res);
                state.musiclist = res.data.result.songs
                console.log(state.musiclist);
            }
             
            const updataindex = (item) =>{
                store.commit('pushplaylist',item)
                store.commit('updataplayListIndex',store.state.playList.length-1)
            }


            function debounce(fn,wait){
            let timer = 0
            //传入的是函数，使用返回一个新函数
            return function(){
                //防抖实际上就是执行最后一个调用的回调函数
                if(timer){
                    clearTimeout(timer)
                }
                //setTimeout返回的是一个ID号
                timer = setTimeout(()=>{
                    fn.apply(this,arguments)
                },wait)
            }
            }
            
            //对搜索进行了防抖处理，1秒延迟后才进行搜索
            watch(()=>word.value,debounce(()=>{
                enter()
            },1000))
            
            /* debounce(enter(),1000) */

            return{
                state,
                word,
                enter,
                del,
                search,
                updataindex,
                debounce
            }
        },
        computed: {
        ...mapMutations([
            'pushplaylist',
            'updataplayListIndex'
            ]),
        ...mapState([
          'playListIndex',
          'playList',
          'duration',
        ])
    }
   }
</script>
<style lang="less" scoped>
    .icon1{
        width: 0.45rem;
        height: 0.45rem;
        position: absolute;
        right: .2rem
    }
    .searchtop{
        width: 100%;
        height: 1rem;
        margin-top: .1rem;
        padding: 0.2rem;
        display: flex;
        align-items: center;
    }
    .icon{
        width: .7rem;
    }
    input{
        width: 90%;
        margin-left: 10px;
        /* 只需要底部边框，清除所有边框，在设置底部边框样式 */
        border: none;
        border-bottom: 1px solid #999;
    }
    .seaechhistory{
        width: 100%;
        padding: 0.2rem;
        .spanh1{
            font-size: 0.3rem;
            font-weight: 700;
        }
        .spanh2{
            padding: 0.1rem;
            background-color: rgb(220, 162, 162);
            border-radius: .4rem;
            margin: .1rem;
            display: inline-block;
        }
    }

    .itemList{
    width: 100%;
    padding: .2rem;
    .item{
        width: 100%;
        height: 1.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .itemLeft{
            width: 85%;
            height: 100%;
            display: flex;
            align-items: center;
            /* 列表序号 */
            .leftSpan{
                font-size: 0.3rem;
                /* 透明度设置 */
                opacity: 0.5;
                display: inline-block;
                width: 0.2rem;
                justify-content:center; 
                align-items:center; 
                margin-left: 0.1rem;
            }
            /* 歌曲名样式 */
            div{
                p{
                    width: 4.54rem;
                    height: .4rem;
                    /* 溢出隐藏，三个互相配合，溢出的显示省略号 */
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: 700;
                    font-size: .28rem;
                }
                span{
                    font-weight: 400;
                    font-size: .24rem;
                    color: #999;
                }
                margin-left: 0.3rem;
            }
        }

        .itemRight{
        width: 20%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        position: relative;
        .icon{
          fill: #999;
          width: 0.5rem;
          height: 0.5rem;
          opacity: 0.6;
          align-items: center;  
        }
         .bofang{
            position: absolute;
            padding-left: 0.1rem;
          }
         .liebiao{
            position: absolute;
            right: 0;
          }
        }
    }
}
</style>