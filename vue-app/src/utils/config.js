


import Vue from "vue"

// import Parent from "@/components/Parent.vue";
// import ChildOne from "@/components/ChildOne.vue";

// // 全局注册组件  
// Vue.component("Parent",Parent);
// Vue.component("ChildOne",ChildOne);


import Head from "@/components/Head.vue"
Vue.component("Head",Head);

import StuNav from "@/components/nav_stu.vue";
Vue.component("StuNav",StuNav);

import MySwipe from "@/components/mySwipe.vue";
Vue.component("MySwipe",MySwipe)

import MySwipeItem from "@/components/swipeitem.vue";
Vue.component("MySwipeItem",MySwipeItem)



Vue.filter("dateFormat",(value,str)=>{
    if(!value) return "";
    str = str || "-"
    var date = new Date(value);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    return `${year}${str}${month}${str}${day} ${hour}:${min}:${sec}`;
});

Vue.filter("stepText",(value)=>{
    console.log(value);
    if(!value) return "未处理";

    if(value==1){
        return "已申诉";
    }else if(value==2){
        return "已审批";
    }
})


Vue.filter("stepcolor",(value)=>{
    console.log(value);
    if(!value) return "primary";

    if(value==1){
        return "danger";
    }else if(value==2){
        return "success";
    }
})

