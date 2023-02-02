/* 歌单详情页获取api连接传递接口 */
import axios from "axios";
import service from "../create实例";
let token = localStorage.getItem("token")
/* 获取歌单详情页数据 */
export function getMusicItem(id){
    return service({
        method:'GET',
        /* 传参id，引入id到访问地址中 */
        //使用
        url: `/playlist/detail?id=${id}`,
        /* params:{
            cookie: encodeURI(token)
        } */
    })
}

/* 获取歌单中歌曲 */
export function getMusicItemList(id){
    return service({
        method:'GET',
        url:`/playlist/track/all?id=${id}&limit=&offset=0`,
        /* params:{
            cookie:encodeURI(token)
        } */
        /* ?cookie=${encodeURI(document.cookie)} */
        
    })
}

/* 获取歌词 */
export function getMusiclyric(id){
    return service({
        method:'GET',
        url:`/lyric?id=${id}`,
       /*  params:{
            cookie:encodeURI(token)
        } */
        
    })
}

export function huoqumusic(id){
    return service({
        method:'GET',
        url:`/song/url/v1?id=${id}&level=exhigh`,
       /*  params:{
            cookie:encodeURI(token)
        } */
    })
}