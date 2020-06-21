<template>
    <el-col class="menu" :span="4" >
        <el-menu
        :default-active="current"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
            <el-menu-item @click="gotoWhere(l.name)"  v-for="(l,i) in list" :key="i" :index="i+''">
                <i :class="l.icon"></i>
                <span slot="title">{{l.text}}</span>
            </el-menu-item>
        </el-menu>
    </el-col>
</template>


<script>
export default {
    props:{
        list:Array,
        current:{
            type:String,
            default:"0"
        }
    },
    methods:{
        gotoWhere(name){
            this.$router.push({name})
        },
        handleOpen(){

        },
        handleClose(){

        }
    }
}
</script>

<style scoped>
.menu{
    width:160px;
    height:100vh;
}
</style>
