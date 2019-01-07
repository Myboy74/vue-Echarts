import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

window.eventBus = new Vue();
axios.defaults.withCredentials=true;//让ajax携带cookie
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');