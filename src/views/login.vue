<template>
  <div class="icon2"><svg @click='$router.go(-1)' t="1656634762245" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2279" width="200" height="200"><path d="M862.485 481.154H234.126l203.3-203.3c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0L135.397 489.373c-12.497 12.497-12.497 32.758 0 45.254l256.774 256.775c6.249 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372c12.497-12.497 12.497-32.759 0-45.255l-203.3-203.301h628.36c17.036 0 30.846-13.81 30.846-30.846s-13.81-30.846-30.846-30.846z" fill="" p-id="2280"></path>
      </svg></div>
  <div class="login">
    <!-- <div class="loginTop">欢迎登录</div>
    <div class="loginContent"> -->
      <!-- <input
        type="text"
        name="phone"
        class="phone"
        v-model="phone1"
        placeholder="请输入手机号码"
      />
      <input
        type="password"
        name="passworld"
        class="passworld"
        v-model="password1"
        placeholder="请输入密码"
      /> -->
      
      <div class="login1">
        <div class="box">
            <p class="table">Login</p>
            <br>
            <input type="text" v-model="phone1" placeholder="账号">
            <input type="password"  v-model="password1" placeholder="密码">
            <br>
            <button class="btn" @click="Login">登录</button>
            <button class="btn" @click="yanzheng">发送验证码</button>
        </div>
      </div>

      
      <!-- <button class="btn" @click="jianyan">检验登录状态</button> -->
</div>


      <!-- <button class="btn" @click="cancel">退出登录</button> -->
    
  
</template>
<script>
import { getyanzhengma,qrCodeLoginKey,qrCodeLoginImg,qrCodeLoginCheck,jianyan,getLoginUser } from '@/request请求文件夹/接口获取 api/homeapi';
import {ref,reactive,onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default 
{
    setup(props) {
        const store = useStore()
        const phone1=ref()
        const password1 = ref()
        const rooter = useRouter()
        console.log(phone1)
        const Login = async ()=>{
            /* dispath传入actions中的方法 */
            let res = await store.dispatch('getlogin',{phone:phone1.value,password:password1.value})
            console.log(res)
            document.cookie = res.data.cookie //保存cookie

            if(res.data.code===200){ //如果登陆成功
              store.commit('updateIsLogin',true)
              
              localStorage.setItem('isLogin',store.state.isLogin)
              store.commit('updateToken',res.data.cookie)
              rooter.push('/infoUser')
              let result = await getLoginUser(res.data.account.id)
              store.commit('updateUser',res.data.account.id)
              
              console.log(result);
            }
            else{
              store.commit('updateIsLogin',false)
              localStorage.setItem('isLogin',store.state.isLogin)
            }
        }
        const yanzheng = async ()=>{
          console.log(phone1.value)
            let res = await store.dispatch('getyanzhengma',phone1.value)
            console.log(res.data.token)
        }
          
          /* const cancel = ()=>{
            cancel()
            } */
        
        const Login1 = async ()=>{
				let nowtime = Date.now();
				//调第一个接口拿key
				let key = (await qrCodeLoginKey(nowtime)).data.data.unikey
        console.log(key)
				//调第二个接口拿二维码图片
				let sginImgURL = (await qrCodeLoginImg(key)).data.data.qrimg
				store.state.signShow = true
				store.state.signURL = sginImgURL
        console.log(store.state.signURL)
				// 800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功
				//每三秒check一次
				let check = setInterval(async () => {
					let nowtime2 = new Date().getTime();
					let res = await qrCodeLoginCheck(key,nowtime2)
          console.log(res)
					console.log(res.data.message, '---')
					if (res.data.code == 800) {
						alert(res.data.message)
						clearInterval(check)
					}
					if (res.data.code == 803) {
						alert(res.data.message)
            console.log(res.data.cookie)
            document.cookie = res.data.cookie
						clearInterval(check)
					}
				}, 3000)
			}
      
      /* onMounted(async () =>{
        let res = await jianyan()
        console.log(res)
      }) */
      
        return{
            phone1,
            password1,
            Login,yanzheng,Login1/* cancel */,jianyan
        }

    }

}
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 12rem;
  padding: 0.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #a29bfe;
  /* .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
  }
  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    .phone,
    .passworld {
      width: 5rem;
      height: 1rem;
      border: 0.02rem solid #999;
    } */
    
  }
  body{
     background-color: #a29bfe;
  }
  .icon2{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: flex-start;
    background-color: #a29bfe;
  }
  .icon{
        width: .7rem;
    }
  .login1{
    width: 90%;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
        to right bottom,
        rgba(255,255,255,.7),
        rgba(255,255,255,.5),
        rgba(255,255,255,.4)
    );
    /* 使背景模糊化 */
    backdrop-filter: blur(10px);
    box-shadow: 0 0 20px #a29bfe;
    border-radius: 15px;
    .btn{
        width: 2rem;
        height: .6rem;
    }
}

.table{
    font:900 40px '';
    text-align: center;
    letter-spacing: 5px;
    color: #3d3d3d;
}
.box{
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.box input{
    width: 300px;
    height: 100%;
    margin-top: 20px;
    outline: none;
    border: 0;
    padding: 10px;
    background-color: transparent;
    border-bottom: 3px solid rgb(150,150,240);
    font: 900 16px '';
}




</style>
