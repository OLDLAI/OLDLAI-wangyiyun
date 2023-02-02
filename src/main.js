/* 全局配置文件 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getVant from './plugins'
import axios from 'axios';

const app = createApp(App)
getVant(app)
app.use(store)
app.use(router).mount('#app')//使用路由
