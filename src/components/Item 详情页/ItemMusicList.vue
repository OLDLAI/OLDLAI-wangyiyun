<template>
<div class="itemMusicList">
    <div class="itemListTop">
        <div class="listLeft">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-24gl-playCircle"></use>
            </svg>
            <span>播放全部<span>(共{{ itemlist.length }}首)</span></span>
        </div>

        <div class="listRight">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiahao1"></use>
            </svg>
            <!-- subscribedCount是view页面独立传入的收藏数据，在state.playlist中，
            所以单独传入 -->
            <span class="shouchang">收藏({{ subscribedCount }})</span>
        </div>
    </div>

    <div class="itemList">
        <div class="item" v-for="(item,i) in itemlist " :key="i">
            <!-- 传入i，序号进入方法中，点击具体歌曲可以得到相应序号 -->
            <div class="itemLeft" @click="playmusic(i)">
                <!-- 歌曲编号，key从0开始，所以加1 -->
                <span class="leftSpan">{{ i + 1 }}</span>
                <div>
                    <!-- 歌曲名字 -->
                    <p>{{item.name}}</p>
                    <span v-for="(item1,index) in item.ar" :key="index">
                    <!-- 作者名字 -->
                    {{item1.name}}
                    </span>
                </div>
            </div>

            <div class="itemRight">
                <!-- 判断，v-if 如果有mv就显示 -->
                <svg class="icon bofang" aria-hidden="true" v-if="item.mv !=0">
                <use xlink:href="#icon-shipin"></use>
                </svg>
                <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-danlieliebiao"></use>
                </svg>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import { mapMutations,mapState } from 'vuex';
import { useStore } from 'vuex';
import { huoqumusic } from '@/request请求文件夹/接口获取 api/item';
export default {
    /* 引入父组件中数据 */
    props: ["itemlist","subscribedCount"],

    setup(props){

      const store = useStore();

      
      const playmusic = async(i) => {
        /* audio.value.src = res1.data.data[0].url */
        /* 点击歌单传递歌单itemlist数据方法 */
        store.commit('updataplayList',props.itemlist)
        /* 点击具体歌曲方法 */
        store.commit('updataplayListIndex',i)
        store.commit('updateId',store.state.playList[store.state.playListIndex].id)
      }

      return {playmusic}

    },
    
    
    computed:{
        ...mapMutations(['updataplayList','updataplayListIndex','updateUrl','updateId']),
        ...mapState([
            'url','id','playList','playListIndex'
        ])
    },
    
};
</script>

<style lang="less" scoped>
.itemMusicList {
    width: 100%;
    height: 10rem;
    background-color: #fff;
    padding: 0.1rem 0.1rem;
    margin-top: 0.1rem;
    /* css3，顶部添加圆角边框 */
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    .itemListTop{
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .listLeft{
            width: 3rem;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
           /*  font-size: 0.25rem; */
            .icon{
                margin-left: 5px;
                width: 0.6rem;
                height: 0.6rem;
                stroke: #333333;
                stroke-width: 15;
            }
            span {
            font-weight: 700;
                span {
                font-weight: 400;
                font-size: 0.24rem;
                color: #999;
            }   
      }
            
        }
        .listRight{
            /* 会自动撑开 */
            /* width: 3rem; */
            /* height: 100%; */
            display: flex;
            /* justify-content: space-around; */
            align-items: center;
            background-color: red;
            border-radius: 0.4rem;
            padding: 0.2rem;
            color: #fff;
            .shouchang{
                font-size: 0.25rem;
            }
            .icon{
                width: 0.3rem;
                height: 0.3rem;
                fill: #fff;
                margin-right: 0.1rem;
                stroke: #fff;
                stroke-width: 50;
            }
        }
    }
}

.itemList{
    width: 100%;
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