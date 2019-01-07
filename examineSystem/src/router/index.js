import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
Vue.use(Router);

// const routers=new Router({
    const route = new Router({
    routes: [
        // {
        //     path: '/',
        //     redirect: 'home',
        // },
        // {
            
        //     path: '/',
        //     component: resolve => require(['../components/common/loadding.vue'], resolve)
        // },
        // {
            
        //     path: '/logout',
        //     component: resolve => require(['../components/common/logout.vue'], resolve)
        // },
        {
            path: '/',
            // redirect:'welcome',
            name:'home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',   //首页
                    name:'welcome',
                    component: resolve => require(['../components/page/assign/welcome.vue'], resolve)
                },
                {
                    path: '/partyCompany',  //党组织和单位信息
                    name:'partyCompany',
                    component: resolve => require(['../components/page/assign/partyCompany.vue'], resolve)
               
                },
                {
                    path: '/partyInformation',  //党员信息统计
                    name:'partyInformation',
                    component: resolve => require(['../components/page/assign/partyInformation.vue'], resolve)
                },
                {
                    path: '/informationRight',  //党员信息统计--全部
                    name:'informationRight',
                    component: resolve => require(['../components/page/assign/informationLeft.vue'], resolve)             
                },
                {
                    path: '/informationRight',  //党员信息统计--分项查看
                    name:'informationRight',
                    component: resolve => require(['../components/page/assign/informationRight.vue'], resolve)
                },
                {
                    path: '/OrgansAndEnterprises',  //机关企事业单位党组织联系社区党组织
                    name:'OrgansAndEnterprises',
                    component: resolve => require(['../components/page/assign/OrgansAndEnterprises.vue'], resolve)
                }, 
                {
                    path: '/contentPublishing',  //内容发布
                    name:'contentPublishing',
                    component: resolve => require(['../components/page/assign/contentPublishing.vue'], resolve)
                },
                {
                    path: '/partyEducation',  //党员教育
                    name:'partyEducation',
                    component: resolve => require(['../components/page/assign/partyEducation.vue'], resolve)
                }, 
                {
                    path: '/Ebranch',  //山东e支部
                    name:'Ebranch',
                    component: resolve => require(['../components/page/assign/Ebranch.vue'], resolve)
                },
                {
                    path: '/partyTransfer',  //党员关系转接
                    name:'partyTransfer',
                    component: resolve => require(['../components/page/assign/partyTransfer.vue'], resolve)
                },
            ]
            
        },
    
        // {
        //     path: '/login',
        //     component: resolve => require(['../components/page/Login.vue'], resolve)
        // },
    ]
})

// import { postAjax, getAjax, uploadImg } from "../api/api.js";
// // 全局路由守卫
// route.beforeEach(function (to, from, next) {
//     const nextRoute = ['welcome', 'partyCompany', 'partyInformation', 'informationRight', 'informationRight'];
//     if (nextRoute.indexOf(to.name) >= 0) {  
    
//     }  
//     //已登录的情况再去登录页，跳转至首页  
     
//     next();  
// });  
export default route;
                                