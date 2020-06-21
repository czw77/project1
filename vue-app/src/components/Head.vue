<template>
    <header :style="{'margin-bottom':0}" class="navbar navbar-static-top  navbar-inverse" id="top">
        <div class="container">
        <div class="navbar-header">
        <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-navbar" aria-controls="bs-navbar" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
            <a  class="navbar-brand">千锋学生管理系统</a>
        </div>
        <nav id="bs-navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
            <li class="active">
                <router-link v-if="!flag" :to="{name:'student'}">学生主页</router-link>
                <router-link v-else :to="{name:'teacher'}">教师主页</router-link>
            </li>
            <li>
                <router-link :to="{name:'login'}">登录</router-link>
            </li>
            <li>
                <router-link :to="{name:'register'}">注册 --- {{data.number}}</router-link>
            </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <li>
                <UploadImg :flag="flag" ></UploadImg>
            </li>
            <li>
                <a class="abox dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{username}}
                <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                    <li><router-link :to="{name:flag?'banguanli':'changeinfo',query:{type:'second'}}">修改个人信息</router-link></li>
                    <li><router-link :to="{name:flag?'banguanli':'changeinfo',query:{type:'third'}}"    class="link">修改密码</router-link></li>
                </ul>
            </li>
        </ul>
        </nav>
    </div>
    </header>

</template>

<script>
import UploadImg from "@/components/uploadImg.vue";
import {mapState} from "vuex";
export default {
    props:['username','flag'],
    components:{
        UploadImg
    },
    computed:{
        ...mapState(['data']),

    }
}
</script>


<style>
.pic{
    width:40px;
    height:40px;
    border-radius:50%;
    margin-top:5px;
}
#top{
    /* position:fixed;
    top:0; */
    width:100%;
}
.abox{
    width:150px;
    padding: 0 10px;
    height:50px;
    display: flex;
    justify-content: center;
    align-content: center;
}
.dropdown-menu>li>a:hover{
    background:palevioletred;
    color:#fff;
}
</style>
