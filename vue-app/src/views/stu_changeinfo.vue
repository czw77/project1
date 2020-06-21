<template>
    <div class="box">
        <h2 class="title">修改个人信息</h2>
        <div class="section" >
            <el-tabs  type="border-card" v-model="activeName" >
                <el-tab-pane label="个人信息" name="first">
                    <StuInfo></StuInfo>
                </el-tab-pane>
                <el-tab-pane label="修改信息" name="second">
                    <SetInfo></SetInfo>
                </el-tab-pane>
                <el-tab-pane label="修改密码" name="third">
                    <ChangePwd></ChangePwd>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import StuInfo from "@/components/stuinfo.vue";
import ChangePwd from "@/components/changepwd.vue";
import SetInfo from "@/components/setinfo.vue";
export default {
    data(){
        return {
            activeName:"first",
        }
    },
    components:{
        StuInfo,
        ChangePwd,
        SetInfo
    },
    methods:{
        handleClick(){

        }
    },
    mounted(){
        this.activeName = this.$route.query.type ?  this.$route.query.type :'first';
    },
    updated(){
       
    }
}
</script>

<style>
.title{
    color:#E6A23C;
    font-size:36px;
}
.section{
    width:80%;
    border:2px solid darkblue;
    border-radius: 8px;
    margin-top:20px;
}
</style>
