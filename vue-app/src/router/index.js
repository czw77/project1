

import Vue from "vue"
import VueRouter from "vue-router"

// 0
Vue.use(VueRouter);  // 全局声明   


import Login from "@/views/login.vue"
import Register from "@/views/register.vue"



const routes = [
    {
        path:"/",
        redirect:{
            name:"login"
        }
    },
    {
        path:"/login",
        name:"login",
        component:Login,
    },
    {
        path:"/register",
        name:'register',
        component:Register
    },
    {
        path:"/teacher",
        name:"teacher",
        component:()=>import("@/views/teacher.vue"),  //Vue  路由 懒加载 
        children:[
            {
                path:"",
                redirect:{name:'banguanli'}
            },
            {
                path:"teamine",
                name:"teamine",
                component:()=>import("@/views/tea_mine.vue")
            },
            {
                path:"stuweiji",
                name:"stuweiji",
                component:()=>import("@/views/tea_stuwj.vue")
            },
            {
                path:"banguanli",
                name:"banguanli",
                component:()=>import("@/views/tea_banji.vue")
            },
            {
                path:"**",
                redirect:{name:'banguanli'}
            }
        ]
    },
    {
        path:"/student",
        name:"student",
        component:()=>import("@/views/student.vue"),  //Vue  路由 懒加载 
        children:[
            {
                path:"",
                redirect:{name:"changeinfo"}
            },
            {
                path:"mine",
                name:"mine",
                component:()=>import("@/views/stu_mine.vue"), 
            },
            {
                path:"weiji",
                name:"weiji",
                component:()=>import("@/views/stu_weiji.vue"), 
            },
            {
                path:"shen",
                name:"shenqing",
                component:()=>import("@/views/stu_shen.vue"), 
            },
            {
                path:"changeinfo",
                name:"changeinfo",
                component:()=>import("@/views/stu_changeinfo.vue"), 
            },
            {
                path:"vuex",
                name:"vuex",
                component:()=>import("@/views/vuex.vue"), 
            },
            {
                path:"**",
                redirect:{name:"changeinfo"}
            }
        ]
    },
    {
        path:"**",
        redirect:{
            name:"login"
        }
    }
]

const router = new VueRouter({
    routes,
    mode:"hash"
})

export default router;