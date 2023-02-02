<template>
<img :src="musicxiangqing.al.picUrl" class="bimg">
    <div class="top">
        <div class="topleft"><div class="topleftjiantou">
        <!-- 返回箭头 -->
            <div class="jiantou">
            <svg  @click="back" t="1656634762245" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2279" width="200" height="200"><path d="M862.485 481.154H234.126l203.3-203.3c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0L135.397 489.373c-12.497 12.497-12.497 32.758 0 45.254l256.774 256.775c6.249 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372c12.497-12.497 12.497-32.759 0-45.255l-203.3-203.301h628.36c17.036 0 30.846-13.81 30.846-30.846s-13.81-30.846-30.846-30.846z" fill="" p-id="2280"></path>
            </svg>
            </div>
        </div>
        <div class="topleftname">
            <p>{{musicxiangqing.name}}</p>
            <!-- 作者名字存在ar数组中，得循环遍历才能正常显示 -->
            <span v-for = "item in musicxiangqing.ar" >{{item.name}}</span>
        </div>
        </div>
    </div>
    
    <div class="center" v-show="!gecishow">
            <img src="@/assets/d7e4e3a244701ee85fecb5d4f6b5bd57.png" alt="" class="imgcd" >
            <!-- 三元表达式判断，如果是播放就旋转 -->
            <img @click="gecishow=true" :src="musicxiangqing.al.picUrl" alt="" class="imgtupian" >
    </div>
    
    <!-- 获取歌词 -->
    <div class="musicLyric" v-show="gecishow" @click="gecishow=false" ref="musicLyric1">
      <!-- 样式进行判断，当前时间要在前一个时间item.time和后一句时间item.next1之间 -->
      <p 
      v-for="item1 in arr" 
      :key="item1" 
      :class="{ active: currentTime >= item1.time && currentTime < item1.next1 }">{{ item1.lrc }}
      </p>
    </div>

    <div class="footerContent">
      <!-- <input type="range" class="range" min="0" :max="duration" step="0.05"  :value="currentTime" @change="input1()" > -->
      <van-slider class="range" v-model="store.state.currentTime" @update:model-value="input1" min="0" :max="duration" step="1"/>
    </div>


    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>  
      <svg
        class="icon"
        aria-hidden="true"
        v-if="zantingshow" @click="play"
      >
        <use xlink:href="#icon-bofang1"></use>
      </svg>

      <svg class="icon" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>

      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
</template>
<script>
import { toRefs,ref,watch,computed } from 'vue';
import { useStore } from 'vuex';
import { mapMutations,mapState } from 'vuex';
import { huoqumusic } from '@/request请求文件夹/接口获取 api/item';

export default {
    /* 子组件接收父组件传递的值 */
    /*  直接接收的props数据没有响应式性质 */
    props:["musicxiangqing","play","zantingshow","arr","getLyric","updateTime","audio","add",],
    /* vue3中要用toRefs(),才能在解构响应式数据时保留其响应式特征，解构出来的数据通过.value操作 */
    setup(props) {
       const {musicxiangqing,play,zantingshow,arr,duration,audio,add,}=toRefs(props)
        const store = useStore()
        const gecishow = false
        const value1 = ref()  
        const musicLyric = ref() 
        value1.value = store.state.currentTime
      
        const input1 = (value)=>{
          value1.value = value
          console.log(value)
          /* audio.value.currentTime = value1.value */
          store.commit('updatacurrentTime',value1.value)
          /* value1.value = audio.value.currentTime */
         
        }
        
        const back = ()=>{
            store.commit('updatayemianshow')
        }
        
        const show = ()=>{
          gecishow = true
        }

        const goPlay = async (num)=> {
          if(audio.value.paused){
            store.commit('updatazantingshow',false)
          }
          let index = store.state.playListIndex + num;
          if (index < 0) {
            index = store.state.playList.length - 1;
          } 
          else if (index == store.state.playList.length) 
          {
            index = 0;
          }
          store.commit('updataplayListIndex',index)
          let res1 = await huoqumusic(store.state.playList[store.state.playListIndex].id)//加上audio的url变化
          audio.value.src = res1.data.data[0].url //audio标签直接设置canplay解决获取duration为NaN的问题
          /* audio.value.load()
          
          audio.value.ondurationchange= function () {
            store.commit( 'updataduration', audio.value.duration)
          }
          store.commit( 'updataduration', audio.value.duration) */
          props.getLyric()
          props.updateTime()
        }
        
        

        watch(()=>value1.value,()=>{
           audio.value.currentTime = value1.value
        })
        

        /* watch(()=>store.state.currentTime, (newValue)=> {
            let p = document.querySelector("p");
            console.log([p])
            if (p) {
              if (p.offsetTop > 300) {
              musicLyric.value.scrollTop = p.offsetTop - 300;
              console.log(musicLyric.value.scrollTop)
              }
            }
            if(newValue===duration){
       
       if(store.state.playListIndex===store.state.playList.length-1){
         updataplayListIndex(0)
         play()
       }
       else
       {
          updatePlayListIndex(playListIndex+1);
       }
     }
        }) */
        /* if (p) {
        if (p.offsetTop > 300) {
          musicLyric.value.scrollTop = p.offsetTop - 300;
        }
      }
      if(newValue===this.duration){
       
        if(this.playListIndex===this.playList.length-1){
          this.updatePlayListIndex(0)
          this.play()
        }
        else
        {
           this.updatePlayListIndex(this.playListIndex+1);
        }
      } */
    /* currentTime: function (newValue) {
      let p = document.querySelector("p.active");
      // console.log([p]);
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      if(newValue===this.duration){
       
        if(this.playListIndex===this.playList.length-1){
          this.updatePlayListIndex(0)
          this.play()
        }
        else
        {
           this.updatePlayListIndex(this.playListIndex+1);
        }
      }
      // console.log([this.$refs.musicLyric])
    } */
  


        return{
            store,musicxiangqing,back,gecishow,show,goPlay,input1,value1,play
        }
    },
     computed: {
        ...mapMutations([
            'updatayemianshow',
            'updataplayListIndex',
            'updatacurrentTime'
            ]),
        ...mapState([
          'lyricList',
          'currentTime',
          'playListIndex',
          'playList',
          'duration',
        ])
    },

  

    

    
   }
</script>
<style lang="less" scoped>
.bimg{
    height: 100%;
    width: 100%;
    /* 绝对定位让图片脱离文档流 */
    position: absolute;
    z-index: -1;
    /* 图片模糊 */
    filter: blur(90px);
}
.top{
    width: 100%;
    height: 1rem;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    align-items: center;
    fill: aliceblue;
    margin-top: 0.2rem;
    .topleft{
        display: flex;
        align-items: center;
        width: 4rem;
        height: 1rem;
        
        .jiantou{
            margin-right: 0.1rem;
        }
        .icon{
            width: 0.7rem;
        }
        .topleftname{
            width: 3rem;
            height: 100%;
        p{
            
            color: white;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        span{
            color: wheat;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        }
    }
}
.center{
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 看起来走了实际没走，相对原本位置定位，无论是否移动，其他元素多无法占据原本位置 */
  position: relative;
  .imgcd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    /* 定义元素下外边界与其包含块下边界的偏移 */
    bottom: 2.8rem;
    z-index: -1;
  }
  .imgtupian{
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.282rem;
    /* 10s匀速无限旋转 */
    animation: rotate_p 10s linear infinite;
  }
  .img_p_active {
    animation-play-state: running;
  }
  .img_p_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_p {
    0% {
        /* 绕z轴旋转 */
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.footer {
    width: 100%;
    height: 1rem;
    display: flex;
    position: absolute;
    margin-top: 0.8rem;
    padding: 0.2rem;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
      width: 0.7rem;
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
.musicLyric {
  width: 100%;
  height: 9.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.3rem;
  overflow: scroll;
  p {
    color: rgb(	227	23	13 );
    font-size: 0.3rem;
    margin-bottom: 0.7rem;
    justify-content: space-between;
  }
  .active {
    color: #fff;
    font-size: 0.5rem;
  }
}
.range {
    width: 100%;
    height: 0.06rem;
}

</style>