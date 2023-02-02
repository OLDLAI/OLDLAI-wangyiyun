import { createStore } from 'vuex'
/* 引入axios登陆请求方法 */
import {getphonelogin,getyanzhengma,qrCodeLoginCheck,qrCodeLoginKey,qrCodeLoginImg} from '../request请求文件夹/接口获取 api/homeapi'

export default createStore({
  state: {
    playList: [{
      /* 定义播放列表获取的歌 */
      al:{
        id: 73291466,
        name: "那个女孩的家在陕西的最北边",
        picUrl: "https://p1.music.126.net/8yVAbyuahn9rvVWWVyrwdA==/109951163553615601.jpg",
      },
      /* 歌曲id */
      id: 1310471772,
      name:'那个女孩的家在陕西的最北边',
      ar:[{name: ""}]
    }],
    
    /* 初始下标 */
    playListIndex: 0, /* 默认下标为0 */
    zantingshow: true,/* 暂停按钮变换 */
    yemianshow: false,/* 歌曲歌词详情页是否显示 */
    lyricList: {}, /* 歌词对象 */
    currentTime: 0, /* 歌曲播放当前时间 */
    duration: 0, //总时长
    isLogin:false, //判断是否登录
    isFoot:true, //登陆界面不显示底部组件
    token:"",
    url: '',
    id: 0,
    user:{},//用户信息
  },
  getters: {
  },
  mutations: {
    updataplayList:function(state,value){
      /* state的值状态改变为value */
      state.playList = value;
    },
    updataplayListIndex:function(state,value){
      state.playListIndex = value;
    },
    updatazantingshow:function(state,value){
      state.zantingshow = value;
    },
    updatayemianshow:function(state){
      state.yemianshow = !state.yemianshow;
    },
    updatalyricList:function(state,value){
      state.lyricList = value
    },
    updatacurrentTime:function(state,value){
      state.currentTime = value
    },
    updataduration:function(state,value){
      state.duration = value
    },
    pushplaylist: function(state,value){
      state.playList.push(value)
    },
    updateIsLogin:function(state,value){
      state.isLogin = value
    },
    updateToken:function(state,value){
      state.token = value
      localStorage.setItem('token',state.token)
    },
    updateUrl:function(state,value){
      state.url = value
    },
    updateId:function(state,value){
      state.id = value
    },
    //获取用户详细信息
    updateUser:function(state,value){
      state.user=value
      localStorage.setItem('user',state.user)
    }
  },
/* 异步获取 */
  actions: {
    getlogin:async function(context,value){
      let res = await getphonelogin(value)
      console.log(res)
      return res
    },
    getyanzhengma:async function(context,value){
      let res = await getyanzhengma(value)
      return res
    }
  },
  modules: {
  }
})
