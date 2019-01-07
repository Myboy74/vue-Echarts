<template>
    <div class="wrapper">
        <link rel='icon' href="../../../static/img/bitbug_favicon.ico" type='image/x-ico' />
        <div
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255)"
            style="width: 100%;height:100%">
        </div>
    </div>
</template>

<script>
import { postAjax, getAjax } from "../../api/api.js";
import qs from "qs";
import axios from 'axios';
export default {
    data() {
        return {
            code: '',
            loading: true,
            state: ''
        };
    },
    mounted() {
        // this.code = this.getQueryVariable("code")
        // this.sendCode()
    },
    methods: {
        // getQueryVariable(variable) {
        //     var query = window.location.search.substring(1);
        //     var vars = query.split("&");
        //     for (var i = 0; i < vars.length; i++) {
        //         var pair = vars[i].split("=");
        //         if (pair[0] == variable) { return pair[1]; }
        //     }
        //     return (false);
        // },
        // toSSO() {  //跳转sso的方法
        //     getAjax("loginUrl").then(res => {
        //         location.href = res.data.data;
        //     });
        // },
        // sendCode() {
        //     let _self = this;
        //     let userCodeUrl = location.href;  //如果登录成功，获取url上的code
        //     console.log(userCodeUrl);
        //     getAjax("getuser").then(res => {
        //         let user = sessionStorage.getItem("gzwId");
        //         console.log(user);
        //         if (user !== null) {  //如果存在user信息则跳转至首页
        //             if (user !== 'undefined') {
        //                 _self.$router.push({ path: '/home' });
        //             }
        //         } else {   //如果不存在user信息则跳转至sso登录页面重新登录
        //             this.toSSO(); //如果user为undefined则跳转至sso登录
        //         }
        //     })
        //         if (userCodeUrl.indexOf("error") >= 0) {  //判断路由是否带有error字符串
        //             this.toSSO();//如果带有error字符串就跳转至sso登录页面重新登录
        //         } else {
        //             let userCodeArray = userCodeUrl.split("?");  //截取路由上的?号并存至数组
        //             let userCode = userCodeArray.pop();    //获取数组中最后一项字符串
        //             userCode = userCode.substring(userCode.length - 2, 0);    //把字符串中后两位的'#'和'/'截掉
        //             if (userCode.indexOf("code=") >= 0) {   //如果userCode有值则调用getCode接口
        //                 getAjax("getCode?" + userCode).then(res => {
        //                     let gzwloginid = res.data.data.gzwId; //将接口返回的gzwId保存到Session中
        //                     sessionStorage.setItem("gzwId", gzwloginid);
        //                 });
        //             }
        //         }
        // },
    }
}
</script>
